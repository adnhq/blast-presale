"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "What is $BLAST?",
      answer:
        "$BLAST is a new cryptocurrency token designed to revolutionize the DeFi space with innovative features and strong community focus.",
    },
    {
      question: "How can I participate in the presale?",
      answer:
        "You can participate in the presale by connecting your wallet and purchasing $BLAST tokens using either SOL or BNB. The minimum purchase amount is 0.1 SOL/BNB.",
    },
    {
      question: "When will trading go live?",
      answer:
        "Trading will go live immediately after the presale ends. The token will be listed on PancakeSwap initially, with more exchanges to follow.",
    },
    {
      question: "Is there a vesting period?",
      answer:
        "Presale tokens are released immediately after the presale ends. There is no vesting period for presale participants.",
    },
    {
      question: "What are the tokenomics?",
      answer:
        "The total supply is 10 billion $BLAST tokens. 20% is allocated for presale, 25% for marketing, 30% for staking rewards, 20% for liquidity, and 5% for exchange listings.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
