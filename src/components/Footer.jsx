import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  footer: {
    height: 30,
    backgroundColor: '#282c34',
    color: '#fff',
    padding: 40,
    fontSize: 22,
  },
};

/*const Footer = () => (
  <footer>
    &copy; Look Lateral {(new Date()).getFullYear()}
  </footer>
);

export default Footer;*/

function Footer(props) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      &copy; Look Lateral {(new Date()).getFullYear()}
    </footer>
  );
}

export default withStyles(styles)(Footer);
