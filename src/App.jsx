import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import ScrambledText from "./components/ScrambledText/ScrambledText";
import SplitText from "./components/SplitText/SplitText";
import Lanyard from "./components/Lanyard/Lanyard";
import GlassIcons from "./components/GlassIcons/GlassIcons";
import { listTools, listProyek } from "./data";
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import ProjectModal from "./components/ProjectModal/ProjectModal"; // <-- IMPORT MODAL
import Aurora from "./components/Aurora/Aurora";
import AOS from 'aos';
import ChatRoom from "./components/ChatRoom";
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

function App() {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null); // null = modal tertutup
  const [showComingSoon, setShowComingSoon] = useState(false); // state untuk popup coming soon

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleDownloadCV = (e) => {
    e.preventDefault(); // mencegah default download behavior
    setShowComingSoon(true); // tampilkan popup coming soon
  };

  const handleCloseComingSoon = () => {
    setShowComingSoon(false);
  };

  // Handle ESC key untuk close popup
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && showComingSoon) {
        setShowComingSoon(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [showComingSoon]);
  // -------------------------

  useEffect(() => {
    const isReload =
      performance.getEntriesByType("navigation")[0]?.type === "reload";

    if (isReload) {
      // Ambil path tanpa hash
      const baseUrl = window.location.origin + "/portofolio/";
      window.location.replace(baseUrl);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full -z-10 ">
        <Aurora
          colorStops={["#577870", "#1F97A6", "#127B99"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">

        <div className="hero grid md:grid-cols-2 items-center pt-6 sm:pt-10 md:gap-8 lg:gap-0 gap-6 sm:gap-8 grid-cols-1 min-h-[90vh] sm:min-h-0">
          <div className="animate__animated animate__fadeInUp animate__delay-3s md:pr-2 lg:pr-4 px-2 sm:px-0">
            <div className="flex items-center gap-3 mb-4 sm:mb-6 bg bg-zinc-800 w-fit p-3 sm:p-4 rounded-2xl">
              <img src="./assets/humam.png" className="w-12 rounded-md -mt-4" />
              <q>Avoid or just undertake it</q>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6">
              <ShinyText text="Hi I'm M.Fahridho Humam Asy'ari" disabled={false} speed={3} className='custom-class' />
            </h1>
            <BlurText
              text="Pengembang  aplikasi  dan  web  yang  berfokus  pada  desain  modern,  performa  tinggi,  dan  solusi  berbasis  teknologi  terkini.  Berpengalaman  membangun  aplikasi  mobile,  website  interaktif,  serta  mengintegrasikan  AI  dan  Machine  Learning  untuk  menciptakan  inovasi  yang  bermanfaat.  "
              delay={150}
              animateBy="words"
              direction="top"
              className="mb-4 sm:mb-6 text-sm md:text-base leading-relaxed"
            />
            <div className="flex items-center sm:gap-4 gap-2 flex-wrap">
              <button 
                onClick={handleDownloadCV}
                className="font-semibold bg-[#1a1a1a] p-3 sm:p-4 px-4 sm:px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors text-sm sm:text-base cursor-pointer"
              >
                <ShinyText text="Download CV" disabled={false} speed={3} className="custom-class" />
              </button>

              <a href="#project" className="font-semibold bg-[#1a1a1a] p-3 sm:p-4 px-4 sm:px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors text-sm sm:text-base">
                <ShinyText text="Explore My Projects" disabled={false} speed={3} className="custom-class" />
              </a>
            </div>

          </div>
          <div className="md:ml-auto animate__animated animate__fadeInUp animate__delay-4s flex justify-center md:justify-end w-full px-2 sm:px-4 md:px-0 md:pl-2">
            <div className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[400px] lg:w-[85%] lg:max-w-none lg:mr-4 xl:mr-8 lg:ml-20 xl:ml-24">
              <ProfileCard
                name="M.Fahridho Humam Asy'ari"
                title="Web Developer"
                handle="hmmasyri"
                status="Online"
                contactText="Contact Me"
                avatarUrl="./assets/humam_kece1.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => window.open('https://wa.me/18185212902', '_blank')}
              />
            </div>
          </div>
        </div>
        {/* tentang */}
        <div className="mt-20 sm:mt-32 mx-auto w-full max-w-[1600px] rounded-2xl sm:rounded-3xl border-[3px] sm:border-[5px] border-violet-500/40 shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] p-4 sm:p-6" id="about">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10 pt-0 px-2 sm:px-8" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            <div className="basis-full md:basis-7/12 pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-violet-500/30 pb-6 md:pb-0">
              {/* Kolom kiri */}
              <div className="flex-1 text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5 text-center md:text-left">
                  About Me
                </h2>

                <BlurText
                  text="I'm M.Fahridho Humam Asy'ari, seorang full-stack developer yang bersemangat dalam membangun aplikasi modern dan berkinerja tinggi dengan pengalaman pengguna yang intuitif. Saya senang bekerja dengan teknologi terkini seperti Artificial Intelligence, Machine Learning, dan pengembangan berbasis cloud. Dengan pengalaman lebih dari dua tahun dan lebih dari 10 proyek yang telah diselesaikan"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-10 text-gray-300 text-center md:text-left"
                />

                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start text-center gap-y-6 sm:gap-y-8 md:gap-x-16 md:gap-y-0 mb-4 w-full">
                  <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl mb-1">
                      10<span className="text-violet-500">+</span>
                    </h1>
                    <p className="text-sm sm:text-base">Project Finished</p>
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl mb-1">
                      2<span className="text-violet-500">+</span>
                    </h1>
                    <p className="text-sm sm:text-base">Years of Experience</p>
                  </div>
                </div>


                <ShinyText
                  text="Working with heart, creating with mind."
                  disabled={false}
                  speed={3}
                  className="text-sm md:text-base text-violet-400 text-center md:text-left"
                />
              </div>
            </div>

            {/* Kolom kanan */}
            <div className="basis-full md:basis-5/12 pl-0 md:pl-8 overflow-hidden max-w-full flex justify-center ">
              <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
            </div>
          </div>

        </div>
        <div className="tools mt-20 sm:mt-32">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center md:text-left" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" >Tools & Technologies</h1>
          <p className="w-full sm:w-3/5 md:w-2/5 text-sm sm:text-base leading-relaxed opacity-50 text-center md:text-left" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">My Profesional Skills</p>
          <div className="tools-box mt-8 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">

            {listTools.map((tool) => (
              <div
                key={tool.id} data-aos="fade-up" data-aos-duration="1000" data-aos-delay={tool.dad} data-aos-once="true"
                className="flex items-center gap-4 p-4 border border-zinc-700 rounded-xl bg-zinc-900/60 backdrop-blur-md hover:bg-zinc-800/80 transition-all duration-300 group shadow-lg"
              >
                <img
                  src={tool.gambar}
                  alt="Tools Image"
                  className="w-16 h-16 object-contain bg-zinc-800 p-2 rounded-lg group-hover:bg-zinc-900 transition-all duration-300"
                />
                <div className="flex flex-col overflow-hidden">
                  <div className="truncate">
                    <ShinyText
                      text={tool.nama}
                      disabled={false}
                      speed={3}
                      className="text-lg font-semibold block"
                    />
                  </div>
                  <p className="text-sm text-zinc-400 truncate">{tool.ket}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* tentang */}

        {/* Proyek */}
        <div className="proyek mt-20 sm:mt-32 py-6 sm:py-10" id="project" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true"></div>
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-2" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">Project</h1>
        <p className="text-sm sm:text-base leading-relaxed text-center opacity-50 px-4 sm:px-0" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">Showcasing a selection of projects that reflect my skills, creativity, and passion for building meaningful digital experiences.</p>
        <div className="proyek-box mt-8 sm:mt-14" >

          <div style={{ height: 'auto', position: 'relative' }} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true" >
            <ChromaGrid
              items={listProyek}
              onItemClick={handleProjectClick} // Kirim fungsi untuk handle klik
              radius={500}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div>
        </div>
        {/* Proyek */}


        {/* Kontak */}
        <div className="kontak mt-20 sm:mt-32 sm:p-10 p-4" id="contact">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl mb-2 font-bold text-center"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            Contact & Chat
          </h1>
          <p
            className="text-sm sm:text-base leading-relaxed text-center mb-6 sm:mb-10 opacity-50 px-4 sm:px-0"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
            data-aos-once="true"
          >
            Get in touch with me or chat in real-time
          </p>

          {/* Container that adapts based on available width */}
          <div className="flex flex-col xl:flex-row gap-4 sm:gap-8">
            {/* Chat Room - always below on smaller screens */}
            <div className="flex-1 bg-zinc-800 p-3 sm:p-4 md:p-6 rounded-md order-2 xl:order-1" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true">
              <ChatRoom />
            </div>

            {/* Contact Form - always on top on smaller screens */}
            <div className="flex-1 order-1 xl:order-2">
              <form
                action="https://formsubmit.co/humambusines@gmail.com"
                method="POST"
                className="bg-zinc-800 p-4 sm:p-6 md:p-10 w-full rounded-md"
                autoComplete="off"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="500"
                data-aos-once="true"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Full Name</label>
                    <input
                      type="text"
                      name="Name"
                      placeholder="Input Name..."
                      className="border border-zinc-500 p-2 rounded-md"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Email</label>
                    <input
                      type="email"
                      name="Email"
                      placeholder="Input Email..."
                      className="border border-zinc-500 p-2 rounded-md"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-semibold">Message</label>
                    <textarea
                      name="message"
                      id="message"
                      cols="45"
                      rows="7"
                      placeholder="Message..."
                      className="border border-zinc-500 p-2 rounded-md"
                      required
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full w-full cursor-pointer border border-gray-700 hover:bg-[#222] transition-colors"
                    >
                      <ShinyText text="Send" disabled={false} speed={3} className="custom-class" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Kontak */}
      </main>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />

      {/* Coming Soon Popup */}
      {showComingSoon && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={handleCloseComingSoon}
        >
          <div 
            className="bg-gradient-to-br from-[#1a1a1a] via-[#222] to-[#1a1a1a] p-6 sm:p-8 rounded-2xl border border-gray-700 shadow-2xl max-w-sm w-full mx-4 transform animate-bounceIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white text-center mb-3">
              Coming Soon
            </h2>

            {/* Message */}
            <p className="text-gray-300 text-center mb-6 leading-relaxed">
              🚀 CV download sedang dalam tahap pengembangan. 
              <br />
              <span className="text-violet-400 font-medium">Nantikan fitur ini segera!</span>
            </p>

            {/* Close Button */}
            <button
              onClick={handleCloseComingSoon}
              className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
