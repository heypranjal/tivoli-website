import React from 'react';
import { Download, TrendingUp, FileText, Users, Mail, ExternalLink } from 'lucide-react';
import Navigation from '../components/Navigation';

// Profile data with images and LinkedIn links
const boardMembers = [
  {
    name: "Mr. Rohit Gupta",
    position: "Chairman",
    linkedin: "https://www.linkedin.com/in/rohit-gupta-472a158/",
    image: "https://i.ibb.co/0j2q8d94/Rohit-Gupta.jpg"
  },
  {
    name: "Mr. Ishan Gupta",
    position: "Director", 
    linkedin: "https://www.linkedin.com/in/ishan-gupta-6b279958/",
    image: "https://i.ibb.co/0jfCP6PZ/Ishaan-Gupta.jpg"
  },
  {
    name: "Mr. Akshay Gupta",
    position: "Director",
    linkedin: "https://www.linkedin.com/in/akshay-gupta-15baab116/",
    image: "https://i.ibb.co/HDWdnL1S/Akshay-Gupta.jpg"
  },
  {
    name: "Mr. Aryaman Gupta", 
    position: "Director",
    linkedin: "https://www.linkedin.com/in/aryaman-gupta-11394a146/",
    image: "https://i.ibb.co/6J89gGmq/Aaryaman-Gupta.jpg"
  }
];

const executiveLeadership = [
  {
    name: "Mr. Amit Kumar Sood",
    position: "CEO",
    linkedin: "https://www.linkedin.com/in/amit-kumar-sood-51b2306a/",
    image: "https://i.ibb.co/Rkb0cQtd/amit-sood-Linkedin.jpg"
  },
  {
    name: "Mr. Sanjay Kasal",
    position: "Corp GM", 
    linkedin: "https://www.linkedin.com/in/sanjaykasal/",
    image: "https://i.ibb.co/21Q3Cbyx/Sanjay-Kasal.jpg"
  }
];

const seniorManagement = [
  {
    name: "Mr. Haider Ali",
    position: "VP Sales & Marketing",
    linkedin: "https://www.linkedin.com/in/strategybyhaiderali/",
    image: "https://i.ibb.co/67RXd6LD/Haider-ali.jpg"
  },
  {
    name: "Mr. Vikas Lal",
    position: "VP Projects & Asset Management", 
    linkedin: "https://www.linkedin.com/in/vikas-b-95a7a6101/",
    image: "https://i.ibb.co/Zz9kjvFn/vikas.jpg"
  }
];

// Profile Card Component
const ProfileCard = ({ person }: { person: any }) => (
  <div className="group bg-white rounded-xl overflow-hidden shadow-lg border border-[#CD9F59]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
    <div className="relative">
      <img 
        src={person.image} 
        alt={person.name}
        className="w-full h-48 object-cover object-top bg-neutral-100"
        onError={(e) => {
          e.currentTarget.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <div className="p-6">
      <h3 className="font-serif text-xl text-neutral-800 mb-2">{person.name}</h3>
      <p className="text-[#CD9F59] font-medium mb-4">{person.position}</p>
      <a 
        href={person.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm text-neutral-600 hover:text-[#CD9F59] transition-colors group/link"
      >
        <span className="mr-2">Connect on LinkedIn</span>
        <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
      </a>
    </div>
  </div>
);

// Section Component
const TeamSection = ({ title, members }: { title: string; members: any[] }) => (
  <div className="mb-16">
    <h2 className="font-serif text-3xl text-[#CD9F59] mb-8 text-center">{title}</h2>
    <div className={`grid gap-8 ${
      members.length === 1 
        ? 'grid-cols-1 max-w-sm mx-auto'
        : members.length === 2 
          ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto'
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    }`}>
      {members.map((member, index) => (
        <ProfileCard key={index} person={member} />
      ))}
    </div>
  </div>
);

export default function People() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-[#001d3d]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-serif text-[44px] mb-4">Leadership Team</h1>
            <p className="text-lg font-light max-w-2xl mx-auto">
              Meet the visionary leaders driving excellence at Tivoli Hotels & Resorts
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Board of Directors */}
        <TeamSection title="Board of Directors" members={boardMembers} />
        
        {/* Executive Leadership */}
        <TeamSection title="Executive Leadership" members={executiveLeadership} />
        
        {/* Senior Management */}
        <TeamSection title="Senior Management" members={seniorManagement} />
      </div>

      {/* Contact Section */}
      <div className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl text-[#CD9F59] mb-6">Connect With Our Team</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
            Our leadership team is committed to excellence and innovation in hospitality. 
            Connect with them to learn more about our vision and values.
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-neutral-500">
            <Users className="w-5 h-5" />
            <span>Professional profiles available on LinkedIn</span>
          </div>
        </div>
      </div>
    </div>
  );
}