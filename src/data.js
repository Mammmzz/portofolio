import HeroImage from "/assets/hero-img.webp";

const Image = {
  HeroImage,
};

export default Image;

import Tools1 from "/assets/tools/vscode.png";
import Tools2 from "/assets/tools/reactjs.png";
import Tools3 from "/assets/tools/nextjs.png";
import Tools4 from "/assets/tools/tailwind.png";
import Tools5 from "/assets/tools/bootstrap.png";
import Tools6 from "/assets/tools/js.png";
import Tools7 from "/assets/tools/nodejs.png";
import Tools8 from "/assets/tools/github.png";
import Tools9 from "/assets/tools/ai.png";
import Tools10 from "/assets/tools/canva.png";
import Tools11 from "/assets/tools/figma.png";
import Tools12 from "/assets/tools/kotlin.png";
import Tools13 from "/assets/tools/firebase.png";
import Tools14 from "/assets/tools/html.png";
import Tools15 from "/assets/tools/css.png";
import Tools16 from "/assets/tools/ts.png";
import Tools17 from "/assets/tools/php.png";
import Tools18 from "/assets/tools/vite.png";
import Tools19 from "/assets/tools/mysql.png";


export const listTools = [
  {
    id: 1,
    gambar: Tools1,
    nama: "Visual Studio Code",
    ket: "Code Editor",
    dad: "100",
  },
  {
    id: 2,
    gambar: Tools2,
    nama: "React JS",
    ket: "Framework",
    dad: "200",
  },
  {
    id: 3,
    gambar: Tools3,
    nama: "Next JS",
    ket: "Framework",
    dad: "300",
  },
  {
    id: 4,
    gambar: Tools4,
    nama: "Tailwind CSS",
    ket: "Framework",
    dad: "400",
  },
  {
    id: 5,
    gambar: Tools5,
    nama: "Bootstrap",
    ket: "Framework",
    dad: "500",
  },
  {
    id: 6,
    gambar: Tools6,
    nama: "Javascript",
    ket: "Language",
    dad: "600",
  },
  {
    id: 7,
    gambar: Tools7,
    nama: "Node JS",
    ket: "Javascript Runtime",
    dad: "700",
  },
  {
    id: 8,
    gambar: Tools8,
    nama: "Github",
    ket: "Repository",
    dad: "800",
  },
  {
    id: 9,
    gambar: Tools9,
    nama: "Adobe Illustrator",
    ket: "Design App",
    dad: "900",
  },
  {
    id: 10,
    gambar: Tools10,
    nama: "Canva",
    ket: "Design App",
    dad: "1000",
  },
  {
    id: 11,
    gambar: Tools11,
    nama: "Figma",
    ket: "Design App",
    dad: "1100",
  },
  {
    id: 12,
    gambar: Tools12,
    nama: "Kotlin",
    ket: "Language",
    dad: "1200",
  },
  {
    id: 13,
    gambar: Tools13,
    nama: "Firebase",
    ket: "Framework",
    dad: "1300",
  },
  {
    id: 14,
    gambar: Tools14,
    nama: "HTML",
    ket: "Language",
    dad: "1400",
  },
  {
    id: 15,
    gambar: Tools15,
    nama: "CSS",
    ket: "Language",
    dad: "1500",
  },
  {
    id: 16,
    gambar: Tools16,
    nama: "TypeScript",
    ket: "Language",
    dad: "1600",
  },
  {
    id: 17,
    gambar: Tools17,
    nama: "PHP",
    ket: "Language",
    dad: "1700",
  },
  {
    id: 18,
    gambar: Tools18,
    nama: "Vite",
    ket: "Framework",
    dad: "1800",
  },
  {
    id: 19,
    gambar: Tools19,
    nama: "MySql",
    ket: "Framework",
    dad: "1900",
  },
];

import Proyek1 from "/assets/proyek/proyek1.jpg";
import Proyek2 from "/assets/proyek/proyek2.jpg";
import Proyek3 from "/assets/proyek/proyek3.jpg";
import Proyek4 from "/assets/proyek/proyek4.jpg";
import Proyek5 from "/assets/proyek/proyek5.jpg";
import Proyek6 from "/assets/proyek/proyek6.jpg";

export const listProyek = [
  {
    id: 1,
    image: Proyek1,
    title: "Website Smart-Hotel",
    subtitle: "Aplikasi web manajemen hotel sederhana yang dirancang...",
    fullDescription:"Aplikasi web manajemen hotel sederhana yang dirancang untuk membantu operasional sehari-hari staf hotel. Menampilkan sistem dual-role dengan dashboard terpisah untuk Kasir dan Manajer, dilengkapi fitur pengecekan ketersediaan kamar real-time, filter kamar berdasarkan status, dan sistem pelaporan. Dibangun menggunakan PHP native, MySQL, dan Bootstrap 5 dengan fokus pada antarmuka yang bersih dan user-friendly untuk memudahkan staf hotel yang tidak terlalu familiar dengan teknologi. Aplikasi ini cocok untuk hotel kecil hingga menengah yang membutuhkan solusi manajemen operasional yang efektif dan mudah digunakan.",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/Mammmzz/smart-hotel",
    dad: "100",
  },
  {
    id: 2,
    image: Proyek2,
    title: "Website Menu Toko 3D",
    subtitle: "Tampilan menu digital interaktif yang menyajikan item...",
    fullDescription:"Tampilan menu digital interaktif yang menyajikan item dalam format carousel 3D yang dinamis dan modern. Dilengkapi dengan navigasi multi-kontrol (tombol panah dan gesekan sentuh) serta efek kemiringan 3D (tilt) yang merespons gerakan mouse, memberikan ilusi kedalaman dan pengalaman pengguna yang lebih kaya. Dibangun sepenuhnya menggunakan teknologi web fundamental seperti HTML5, CSS3, dan JavaScript, proyek ini dirancang untuk menawarkan cara yang menarik secara visual bagi restoran atau toko untuk menampilkan produk mereka, dengan desain yang responsif untuk berbagai perangkat.",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://github.com/Mammmzz/website-menu-toko",
    dad: "200",
  },
  {
    id: 3,
    image: Proyek3,
    title: "Website Toko Saya",
    subtitle: "Aplikasi web e-commerce fungsional yang dirancang sebagai platform...",
    fullDescription:" toko online dasar, mencakup manajemen produk (CRUD), keranjang belanja, proses checkout, dan sistem otentikasi pengguna. Proyek ini dilengkapi dengan integrasi notifikasi email menggunakan PHPMailer untuk konfirmasi pesanan, serta pemisahan logika yang jelas antara antarmuka pengguna (frontend) dan panel administrasi (backend). Dibangun menggunakan PHP native, MySQL, dan Composer untuk manajemen dependensi, aplikasi ini menjadi contoh solid dari implementasi sistem penjualan online yang esensial.",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/Mammmzz/toko-As-Saadah ",
    dad: "300",
  },
  {
    id: 4,
    image: Proyek4,
    title: "Portfolio Web Pribadi",
    subtitle: "Portfolio web interaktif yang menampilkan perjalanan profesional...",
    fullDescription:"Portfolio web interaktif yang menampilkan perjalanan profesional saya, keterampilan, dan proyek-proyek. Dirancang dengan estetika yang bersih namun modern, portfolio ini menyoroti keahlian teknis saya dalam pengembangan web, rekayasa perangkat lunak, dan IoT. Situs ini juga berfungsi sebagai pusat utama bagi calon perekrut dan kolaborator untuk menjelajahi karya-karya saya, mencerminkan kreativitas dan presisi teknis saya.",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://github.com/Mammmzz/portofolio",
    dad: "400",
  },
    {
    id: 5,
    image: Proyek5,
    title: "Website Toko Fashion Sederhana",
    subtitle: "Platform e-commerce komprehensif untuk toko fashion online, dirancang ...",
    fullDescription:"Platform e-commerce komprehensif untuk toko fashion online, dirancang dengan fungsionalitas terpisah untuk pengguna dan administrator. Pengguna dapat melakukan registrasi, menelusuri produk, mengelola keranjang belanja, menyelesaikan proses checkout, hingga melacak riwayat pesanan dan profil pribadi. Di sisi lain, panel admin menyediakan kontrol penuh atas manajemen produk, pesanan, dan akun pengguna. Dibangun dengan tumpukan teknologi fundamental PHP, MySQL, dan JavaScript, proyek ini menjadi cetak biru yang solid untuk sistem ritel online yang fungsional dan mudah",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/rissss21",
    dad: "500",
  },
  {
    id: 6,
    image: Proyek6,
    title: "Coffee Shop Website",
    subtitle: "Sistem gerbang tol otomatis cerdas yang mengintegrasikan Machine...",
    fullDescription:"Sistem gerbang tol otomatis cerdas yang mengintegrasikan Machine Learning untuk pengenalan plat nomor dan klasifikasi jenis kendaraan secara real-time. Arsitekturnya terdiri dari aplikasi client-side berbasis Python dan Tkinter yang memanfaatkan model YOLO untuk deteksi objek dan EasyOCR untuk pengenalan karakter, serta backend API yang dibangun dengan Laravel untuk menangani validasi, transaksi, dan manajemen tarif. Proyek ini mendemonstrasikan implementasi sistem visi komputer yang kompleks untuk otomatisasi infrastruktur, dengan fitur tambahan seperti tracking kendaraan, pencegahan transaksi duplikat, dan simulasi palang pintu tol.",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://github.com/Mammmzz/mahavition-toll-ml-api",
    dad: "600",
  },
];
