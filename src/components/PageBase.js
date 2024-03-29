import React from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import globalStyles from '../styles';

const PageBase = (props) => {
    const {title, navigation} = props;
    return (
      <div>
        <span style={globalStyles.navigation}>{navigation}</span>
        <Paper style={globalStyles.paper}>
          <h3 style={globalStyles.title}>{title}</h3>
          <Divider/>
          {/* CONDITIONALLY RENDERED THROUGH FORM/TABLE PAGE */}
          {props.children}
          <div style={globalStyles.clear}/>
        </Paper>
      </div>
    );
};

export default PageBase;
