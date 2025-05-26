import React, { useEffect, useState } from "react";
import { client } from "../sanity/client";
import "../style/about.css";

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "about"][0]`)
      .then((data) => setAboutData(data))
      .catch(console.error);
  }, []);

  if (!aboutData) return <p className="about-loading">Laddar...</p>;

  return (
    <div className="about-page">
      <h1 className="about-title">{aboutData.title}</h1>
      <p className="about-content">{aboutData.content}</p>
    </div>
  );
};

export default About;
