export default function handler(req, res) {
  const portfolioVideos = [
    {
      id: "1",
      title: "Claytoon Studio Showreel",
      description: "Our latest clay animation and cartoon compilation showing our best client works from the past year.",
      youtubeLink: "https://www.youtube.com/watch?v=Q4V0zN-mP1o",
      thumbnail: "https://img.youtube.com/vi/Q4V0zN-mP1o/hqdefault.jpg"
    },
    {
      id: "2",
      title: "The Clay Adventures - Episode 1",
      description: "A delightful character-driven stop motion claymation series about three friendly clay shapes searching for colors.",
      youtubeLink: "https://www.youtube.com/watch?v=2bPGjL7R6dI",
      thumbnail: "https://img.youtube.com/vi/2bPGjL7R6dI/hqdefault.jpg"
    },
    {
      id: "3",
      title: "Vibrant Forest Cartoon Promo",
      description: "A colorful advertisement project designed for a children's brand featuring full 2D cartoon animations.",
      youtubeLink: "https://www.youtube.com/watch?v=8c3T9FpeZgM",
      thumbnail: "https://img.youtube.com/vi/8c3T9FpeZgM/hqdefault.jpg"
    },
    {
      id: "4",
      title: "Claytoon Ad Campaigns - Compilation",
      description: "High-impact social media cartoon advertisements created for tech and lifestyle brands to boost conversion rates.",
      youtubeLink: "https://www.youtube.com/watch?v=F76x1sJ5Pkw",
      thumbnail: "https://img.youtube.com/vi/F76x1sJ5Pkw/hqdefault.jpg"
    },
    {
      id: "5",
      title: "Behind the Scenes of Stop Motion",
      description: "A peek into our studio showing how we sculpt clay characters, capture frames, and engineer storytelling.",
      youtubeLink: "https://www.youtube.com/watch?v=T2J_5u3J5Xk",
      thumbnail: "https://img.youtube.com/vi/T2J_5u3J5Xk/hqdefault.jpg"
    },
    {
      id: "6",
      title: "Interactive Mascot Animations",
      description: "Cute cartoon character models animated for websites and mobile applications to create playfulness.",
      youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
    }
  ];

  res.status(200).json(portfolioVideos);
}
