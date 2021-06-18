

import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,

    },
    selectEmpty: {
      marginTop: theme.spacing(1),
    },
  }),
);

interface LanguageSelectProps {
  
}

const LanguageSelect: React.FC<LanguageSelectProps> = () => {
  const classes = useStyles();
  const [language, setLanguage] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLanguage(event.target.value as string);
  };

  return (
    <div>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="language">Language</InputLabel>
        <Select
          labelId="language"
          id="demo-simple-select-outlined"
          value={language}
          onChange={handleChange}
          label="Language"
        >
          <MenuItem value={10}>English</MenuItem>
          <MenuItem value={20}>Finnish</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

  
export { LanguageSelect }