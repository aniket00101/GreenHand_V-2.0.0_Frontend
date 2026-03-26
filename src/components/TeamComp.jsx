import React from "react";
// For icons, you can use lucide-react or heroicons. 
// If you don't have them, the text version is still styled here.

const TeamSection = () => {
  const team = [
    {
      name: "Aniket Das",
      role: "FullStack + Ml Developer",
      bio: "Develops AI-powered platforms for smart, efficient, and sustainable farming solutions.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Sarnendu Chattopadhyay",
      role: "Ml Developer",
      bio: "Builds predictive models to improve crop yield and farming decisions.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Monalisha Maity",
      role: "FullStack Developer",
      bio: "Creates intuitive interfaces connecting farmers with modern digital agricultural tools.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Aachal Kumari",
      role: "FullStack Developer",
      bio: "Designs scalable backend systems supporting real-time smart farming applications efficiently.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 px-6 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-60 translate-x-1/4 translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Georgia', serif" }}> The Minds Behind <span className="text-green-600 italic">GreenHand</span> </h2>
          
          <div className="w-24 h-1 bg-green-500 mx-auto rounded-full mb-6"></div>
          
          <p className="text-gray-600 max-w-2xl mx-auto text-base font-medium leading-relaxed"> Combining deep-rooted environmental passion with cutting-edge technology to build a greener tomorrow.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {team.map((member, index) => (
            
            <div key={index} className="group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full overflow-hidden">

              <div className="h-2 w-full bg-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              <div className="relative pt-6 px-6">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-inner bg-gray-100">
                  
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>

                </div>
                
              </div>

              <div className="p-8 flex flex-col flex-grow text-center">

                <p className="text-[12px] font-black uppercase text-green-600 tracking-widest mb-2"> {member.role} </p>
                
                <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors"> {member.name} </h3>
                
                <p className="text-gray-700 text-sm leading-relaxed italic line-clamp-3"> "{member.bio}" </p>

              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default TeamSection;