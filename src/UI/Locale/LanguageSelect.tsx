import React from 'react';
import { FormattedMessage } from 'react-intl';
import { makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { UIContext }  from '../Context/Context';

const useStyles = makeStyles((theme: Theme) => ({
  spacing: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    color: theme.palette.text.primary,
    fontWeight: 'bold',
  },
  hover: {
    "& :hover": {
      cursor: 'pointer'
    }
  }
}));

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const { sites } = React.useContext(UIContext);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  const languages = sites.map(site => site.locale);

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className={classes.spacing}>
      <DialogTitle id="simple-dialog-title">Select Language</DialogTitle>
      <List>
        {languages.map((language) => (
          <ListItem button onClick={() => handleListItemClick(language)} key={language}>
            <ListItemText primary={<FormattedMessage id={language} />} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
interface LanguageSelectProps {

}

const LanguageSelect: React.FC<LanguageSelectProps> = () => {
  const classes = useStyles();
  const { setLocale, locale } = React.useContext(UIContext);
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setLocale(value);
  };

  return (
    <div className={classes.hover}>
      <div onClick={handleClickOpen} className={classes.spacing}>
        <FormattedMessage id={locale} />
      </div>
      <SimpleDialog selectedValue={locale} open={open} onClose={handleClose} />
    </div>
  );
}


export { LanguageSelect }
