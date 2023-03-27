import { useState, useEffect } from 'react'
import './App.css'
import { ImageSlider } from './components/ImageSlider';

function App() {
  const [images, setImages] = useState({
    loading: true,
    results: []
  });

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await fetch('https://www.reddit.com/r/aww/top/.json?t=all');
        if (response.ok) {
          const data = await response.json();
          const updatedResponse = data.data.children.map((item) => {
            const properties = {
              id: item.data.id,
              imageUrl : item.data.thumbnail
            }
            return properties;
          });
          setImages({
            loading: false,
            results: updatedResponse
          });
        } else {
          throw new Error('Request failed');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getImages();
  }, []);

  return (
    <div>
      <div className='container'>
        {!images.loading && images.results.length > 0 && (
          <ImageSlider
            images={images.results}
          />
        )}
        {images.loading && (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

export default App
