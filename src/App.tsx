import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    axios({
      url: '/api/baserow',
      headers: {
        Authorization: `Token ${import.meta.env.VITE_BASEROW_LCU_SUBSCRIPTION_ID}`,
      },
    }).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  return (
    <>
      {post.results.map((item: any) => (
        <div key={item.id}>
          NA?: {item["If North America"] ? "true" : "false"}<br />
          {item.Logo && item.Logo[0] && <img src={item.Logo[0].url} width="200px" />}<br />
          {item.Name}
          <br />
          {item.Description}
          <br />
          <a href={item.Website}>{item.Website}</a>
          <br />
          {item.Funnumbers}
        </div>
      ))}
    </>
  );
}

export default App;