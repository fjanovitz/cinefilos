import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type ContentCardProps = {
  content: {
    id: string;
    title: string;
    banner: string;
    content_type: string;
    synopsis: string;
    gender: string;
    release_year: number;
    rating: number;
    duration: number; 
    director: string;
  };
};

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const [banner, setBanner] = useState('');

  useEffect(() => {
    const fetchBanner = async () => {
      const api_key = '6e4aedb99caf78035a342129ca5f9116';
      const urlBase = content.content_type === "movies" ? "movie" : content.content_type === "tv_shows" ? "tv" : "";
      const url = `https://api.themoviedb.org/3/${urlBase}/${content.id}?api_key=${api_key}`;

      try {
        const response_banner = await fetch(url);
        const banner_data = await response_banner.json();
        const bannerURL = banner_data && banner_data['poster_path'] ? `https://image.tmdb.org/t/p/original${banner_data['poster_path']}` : ''; 
        setBanner(bannerURL);
      }
      catch (error) {
        console.error('Erro ao buscar dados do filme:', error);
      }
    };

    fetchBanner();
  }, []);

  return (
    <Link to={`/contents/${content.content_type}/${content.title}`} key={content.id} style={{ textDecoration: 'none' }}> 
      <Card style={{ width: '10rem', height: '18rem', margin: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', background: "lightgray" }}>
        <Card.Img variant="top" src={banner} style={{ width: '10rem', height: '16rem', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
        <Card.Body>
          <Card.Title style={{ textAlign: 'center', textDecoration: 'none', color: 'black' }}>{content.title}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ContentCard;