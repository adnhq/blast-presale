use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, Mint, Token, TokenAccount, Transfer, MintTo},
};
use solana_program::{system_instruction, system_program};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

const PRESALE_END_TIMESTAMP: i64 = 1769727599; // Feb 28, 2025 23:59:59 UTC
const PRICE_LAMPORTS: u64 = 500_000; // 0.0005 SOL
const SOL_RECEIVER: &str = "9dPsapu78T1cmHvcHxyMT2tH4n7uihdRKGVb1WCrZrZa";

#[program]
pub mod blast_presale {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        total_supply: u64,
        treasury: Pubkey,
        marketing: Pubkey,
    ) -> Result<()> {
        // Verify total supply is divisible by 4
        require!(total_supply % 4 == 0, ErrorCode::InvalidSupply);
        
        let allocation = total_supply / 4;
        let mint = &ctx.accounts.mint;
        let presale = &mut ctx.accounts.presale;

        // Initialize token mint with owner as mint authority
        token::initialize_mint(
            ctx.accounts.token_program.to_account_info(),
            mint.to_account_info(),
            ctx.accounts.owner.key(),
            Some(ctx.accounts.owner.key()),
            9, // Decimals
        )?;

        // Mint allocations to all parties
        mint_allocation(
            allocation,
            &ctx.accounts.presale_token_account,
            &ctx.accounts.owner,
            &ctx.accounts.mint,
            &ctx.accounts.token_program,
        )?;

        mint_allocation(
            allocation,
            &ctx.accounts.treasury_token_account,
            &ctx.accounts.owner,
            &ctx.accounts.mint,
            &ctx.accounts.token_program,
        )?;

        mint_allocation(
            allocation,
            &ctx.accounts.marketing_token_account,
            &ctx.accounts.owner,
            &ctx.accounts.mint,
            &ctx.accounts.token_program,
        )?;

        mint_allocation(
            allocation,
            &ctx.accounts.owner_token_account,
            &ctx.accounts.owner,
            &ctx.accounts.mint,
            &ctx.accounts.token_program,
        )?;

        // Initialize presale state
        presale.mint = mint.key();
        presale.treasury = treasury;
        presale.marketing = marketing;
        presale.owner = ctx.accounts.owner.key();
        presale.presale_token_account = ctx.accounts.presale_token_account.key();

        Ok(())
    }

    pub fn buy_tokens(ctx: Context<BuyTokens>, lamports: u64) -> Result<()> {
        // Presale time check
        require!(
            Clock::get()?.unix_timestamp <= PRESALE_END_TIMESTAMP,
            ErrorCode::PresaleEnded
        );

        // Calculate tokens to distribute
        let tokens = lamports
            .checked_div(PRICE_LAMPORTS)
            .ok_or(ErrorCode::CalculationError)?;

        // Transfer SOL to receiver
        let sol_transfer = system_instruction::transfer(
            &ctx.accounts.buyer.key(),
            &Pubkey::from_str(SOL_RECEIVER).unwrap(),
            lamports,
        );
        anchor_lang::solana_program::program::invoke(
            &sol_transfer,
            &[
                ctx.accounts.buyer.to_account_info(),
                ctx.accounts.sol_receiver.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        // Transfer tokens to buyer
        let cpi_accounts = Transfer {
            from: ctx.accounts.presale_token_account.to_account_info(),
            to: ctx.accounts.buyer_token_account.to_account_info(),
            authority: ctx.accounts.presale_signer.to_account_info(),
        };
        
        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                cpi_accounts,
                &[&[b"presale", &[*ctx.bumps.get("presale_signer").unwrap()]]],
            ),
            tokens,
        )?;

        Ok(())
    }
}

// Helper function for minting allocations
fn mint_allocation(
    amount: u64,
    token_account: &Account<TokenAccount>,
    owner: &Signer,
    mint: &Account<Mint>,
    token_program: &Program<Token>,
) -> Result<()> {
    token::mint_to(
        CpiContext::new_with_signer(
            token_program.to_account_info(),
            MintTo {
                mint: mint.to_account_info(),
                to: token_account.to_account_info(),
                authority: owner.to_account_info(),
            },
            &[&[owner.key().as_ref(), &[owner.bumps.token_mint]]],
        ),
        amount,
    )
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = owner, space = 8 + 32*4)]
    pub presale: Account<'info, Presale>,
    
    #[account(mut)]
    pub owner: Signer<'info>,
    
    #[account(
        init,
        payer = owner,
        mint::decimals = 9,
        mint::authority = owner,
    )]
    pub mint: Account<'info, Mint>,
    
    // Presale token account (PDA-controlled)
    #[account(
        init,
        payer = owner,
        token::mint = mint,
        token::authority = presale_signer,
    )]
    pub presale_token_account: Account<'info, TokenAccount>,
    
    // Treasury token account
    #[account(
        init_if_needed,
        payer = owner,
        associated_token::mint = mint,
        associated_token::authority = treasury,
    )]
    pub treasury_token_account: Account<'info, TokenAccount>,
    
    // Marketing token account
    #[account(
        init_if_needed,
        payer = owner,
        associated_token::mint = mint,
        associated_token::authority = marketing,
    )]
    pub marketing_token_account: Account<'info, TokenAccount>,
    
    // Owner token account
    #[account(
        init_if_needed,
        payer = owner,
        associated_token::mint = mint,
        associated_token::authority = owner,
    )]
    pub owner_token_account: Account<'info, TokenAccount>,
    
    // PDA for presale authority
    #[account(
        seeds = [b"presale"],
        bump,
    )]
    pub presale_signer: AccountInfo<'info>,
    
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
    
    // Receiver addresses
    /// CHECK: Validated in instruction
    #[account(mut)]
    pub treasury: AccountInfo<'info>,
    /// CHECK: Validated in instruction
    #[account(mut)]
    pub marketing: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct BuyTokens<'info> {
    #[account(mut)]
    pub presale: Account<'info, Presale>,
    
    #[account(
        mut,
        seeds = [b"presale"],
        bump,
    )]
    pub presale_signer: AccountInfo<'info>,
    
    #[account(
        mut,
        address = presale.presale_token_account,
    )]
    pub presale_token_account: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub buyer: Signer<'info>,
    
    #[account(
        mut,
        associated_token::mint = presale.mint,
        associated_token::authority = buyer,
    )]
    pub buyer_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        address = SOL_RECEIVER.parse::<Pubkey>().unwrap()
    )]
    /// CHECK: Verified SOL receiver
    pub sol_receiver: AccountInfo<'info>,
    
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Presale {
    pub mint: Pubkey,
    pub treasury: Pubkey,
    pub marketing: Pubkey,
    pub owner: Pubkey,
    pub presale_token_account: Pubkey,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Presale has ended")]
    PresaleEnded,
    #[msg("Invalid calculation")]
    CalculationError,
    #[msg("Total supply must be divisible by 4")]
    InvalidSupply,
    #[msg("Invalid SOL receiver address")]
    InvalidReceiver,
}