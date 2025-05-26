import React, { useEffect, useState } from "react";
import { client } from '../sanity/client'

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    client.fetch(`*[_type == "about"][0]`)
      .then((data) => setAboutData(data))
      .catch(console.error);
  }, []);

  if (!aboutData) return <p>Laddar...</p>;

  return (
    <div className="about-page">
      <h1>{aboutData.title}</h1>
      <p>{aboutData.content}</p>
    </div>
  );
};

export default About;
