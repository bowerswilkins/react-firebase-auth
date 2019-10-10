const theme = {
  color: {
    white: "white",
    black: "black", 
    grey: "#eaeaea",
    green: "green"
  }
};

const style = {
  '@global': {
    '#root_node': {
      height: '100%'
    },
    '.switch-wrapper': {
      position: 'relative'
    }
  },
  app: {
    height: '100%',
    background: "white",
    '& .table': {
      display: 'table',
      height: '100%',
      width: '100%'
    },
    '& .container': {
      margin: '0 auto',
      display: 'table-row',
      height: '100%'
    },
    '& .row': {
      display: 'table-cell',
      'vertical-align': 'middle'
    },
    '& .content': {
      padding: '3em 2em',
      width: '400px',
      margin: '0 auto'
    }
  },
  button: {
    margin: "1em 0",
    float: "right",
    fontWeight: "bold",
    background: "linear-gradient(to bottom,  #45484d 0%,#000000 100%)",
    color: theme.color.white,
    '&:hover': {
      color: theme.color.black,
      background: theme.color.grey
    }
  },
  field: {
    width: "100%",
    margin: "15px 0",
    color: theme.color.black,
    background: 'none'
  },
  loginform: {
    display: 'inline-block',
    width: '100%',
    'text-align': 'center',
    "& section": {
      overflow: 'hidden'
    }
  },
  link: {
    marginTop: '1em',
    fontSize: '13px'
  },
  spinner: {
    width: '8em',
    height: '8em',
    margin: '20px auto',
    fontSize: '6px',
    borderTop: '.8em solid rgba(0,0,0, 0.2)',
    borderRight: '.8em solid rgba(0,0,0, 0.2)',
    borderBottom: '.8em solid rgba(0,0,0, 0.2)',
    borderLeft: '.8em solid #000000',
    '&:after': {
      width: '8em',
      height: '8em'
    }
  }
}

export default style