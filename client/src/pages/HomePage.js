import React from 'react';
import { Typography, Box, Link, Container } from '@material-ui/core';

const HomePage = () => {
  return (
    <Container>
      <Box padding={4}>
          <Typography variant="h4" gutterBottom>Welcome to Project Showcase!</Typography>
          <Typography variant="body1" paragraph>
              This platform was designed to help individuals like you to showcase your amazing projects.
          </Typography>
          <Typography variant="body1" paragraph>
              To get started, simply create an account and log in. Once you're logged in, you can create your own projects, 
              view other users' projects, and even edit or delete your own projects.
          </Typography>
          <Typography variant="body1" paragraph>
              To share your projects to others, you can share the link of projects page with a query of your username. 
              This allows others to see your projects without login.
          </Typography>
          <Typography variant="body1" paragraph>Example: "xxxxxx/projects?username=horacexu"</Typography>
          <hr/>
          <Typography variant="h6">My Portfolio</Typography>
          <Typography variant="body1" paragraph>
              Want to see more of my work? Feel free to check out my other portfolio sites:
          </Typography>
          <Link href="http://haotian-xu.infinityfreeapp.com/portfolio/home.php" target="_blank" rel="noopener">Haotian Xu Portfolio 1 </Link>
          -- using PHP, javascript, Bootstrap, and MySQL. Also enable CRUD but only for one user (me)
          <br/>
          <Link href="https://haotian-xu-website.netlify.app/" target="_blank" rel="noopener">Haotian Xu Portfolio 2 </Link>
          -- using React and Joy UI. My beginner website.
          <hr/>
          <Typography variant="h6" marginTop={2}>Contact Me</Typography>
          <Typography variant="body1" paragraph>
              If you have any questions or would like to get in touch, feel free to reach out:
          </Typography>
          <Typography variant="body1" paragraph>Email: <Link href="mailto:hax030@ucsd.edu">email</Link></Typography>
          <Typography variant="body1" paragraph>LinkedIn: <Link href="https://www.linkedin.com/in/haotian-xu-xht2021/" target="_blank" rel="noopener">haotian-xu-xht2021</Link></Typography>
          <Typography variant="body1" paragraph>Github: <Link href="https://github.com/haotianxu2021" target="_blank" rel="noopener">haotianxu2021</Link></Typography>
      </Box>
    </Container>
  );
};


export default HomePage;
