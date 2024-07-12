import React from 'react';
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
  return (
    <Link to={`/contents/${content.content_type}/${content.title}`} key={content.id} style={{ textDecoration: 'none' }}> 
      <Card style={{ width: '10rem', height: '18rem', margin: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', background: "lightgray" }}>
        <Card.Img variant="top" src={content.banner} style={{ width: '10rem', height: '16rem', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>{content.title}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ContentCard;