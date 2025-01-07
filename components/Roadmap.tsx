import React from 'react';
import { CheckCircle2, Circle, ChevronRight, Rocket, Users, Building, Globe, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Phase {
  title: string;
  description: string;
  items: string[];
  status: 'completed' | 'in-progress' | 'upcoming';
  icon: LucideIcon;
}

interface TimelineNodeProps {
  status: Phase['status'];
}

const phases: Phase[] = [
  {
    title: "Phase 1",
    description: "Launch & Initial Growth",
    items: ["Launch on DEX", "1,000+ holders", "Community building"],
    status: "completed",
    icon: Rocket
  },
  {
    title: "Phase 2",
    description: "Expansion",
    items: ["CEX listings", "10,000+ holders", "Strategic partnerships"],
    status: "in-progress",
    icon: Users
  },
  {
    title: "Phase 3",
    description: "Scaling",
    items: ["Major exchange listings", "50,000+ holders", "Global marketing"],
    status: "upcoming",
    icon: Building
  },
  {
    title: "Phase 4",
    description: "Domination",
    items: ["100,000+ holders", "NFT launch", "$BLAST ecosystem"],
    status: "upcoming",
    icon: Globe
  }
];

const TimelineNode: React.FC<TimelineNodeProps> = ({ status }) => {
  if (status === "completed") {
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center">
        <CheckCircle2 className="w-5 h-5 text-white" />
      </div>
    );
  }
  if (status === "in-progress") {
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 animate-pulse" />
    );
  }
  return (
    <div className="w-8 h-8 rounded-full border-2 border-gray-700">
      <Circle className="w-full h-full text-gray-600" />
    </div>
  );
};

const Roadmap: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Desktop Timeline */}
      <div className="hidden md:block relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-pink-500 via-purple-500 to-gray-800" />
        
        <div className="space-y-24">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <div key={phase.title} className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <TimelineNode status={phase.status} />
                </div>

                <Card className={`w-[calc(50%-2rem)] backdrop-blur-xl hover:scale-105 transition-transform duration-300
                  ${index % 2 === 0 ? "ml-auto" : "mr-auto"}
                  border-gray-800 bg-gray-900/90`}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
                        {phase.title}
                      </h3>
                      <Icon className={`w-6 h-6 ${
                        phase.status === "completed" ? "text-green-500" : 
                        phase.status === "in-progress" ? "text-purple-500" : "text-gray-600"
                      }`} />
                    </div>
                    <p className="text-gray-400 mb-4">{phase.description}</p>
                    <ul className="space-y-3">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 group">
                          <ChevronRight className="w-5 h-5 text-pink-500 group-hover:translate-x-1 transition-transform" />
                          <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="md:hidden space-y-8">
        {phases.map((phase) => {
          const Icon = phase.icon;
          return (
            <Card key={phase.title} 
              className="border-gray-800 bg-gray-900/90 backdrop-blur-xl 
                hover:scale-102 transition-transform duration-300"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <TimelineNode status={phase.status} />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                      {phase.title}
                    </h3>
                    <p className="text-gray-400">{phase.description}</p>
                  </div>
                  <Icon className={`w-6 h-6 ${
                    phase.status === "completed" ? "text-green-500" : 
                    phase.status === "in-progress" ? "text-purple-500" : "text-gray-600"
                  }`} />
                </div>
                <ul className="space-y-3 ml-12">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 group">
                      <ChevronRight className="w-5 h-5 text-pink-500 group-hover:translate-x-1 transition-transform" />
                      <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;