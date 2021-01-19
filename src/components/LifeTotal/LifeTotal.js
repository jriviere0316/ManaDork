import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import ColorPicker from 'material-ui-color-picker';
import { SketchPicker } from 'react-color';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import './LifeTotal.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 160,
    // maxheight: 180,

    background: 'p1Color'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

  rotate: {
    display: 'inline-block',
    transform: 'rotate(180deg)',
  },

  normal: {
    display: 'inline-block',
  },

  phoneView:{
    display: 'block',
    margin: 'auto',
    width: '320px',
    height: '645px',
    border: 'solid black 5px',
    borderRadius: '10px'
  }

});

function LifeTotal(props) {
    const [heading, setHeading] = useState('Mobile MUI Life Total');
    const classes = useStyles();

    const [totalPlayers, setTotalPlayers] = useState(4);

    const [p1, setP1] = useState(40);
    const [p1Color, setP1Color] = useState('#00ff3c');
    // console.log('p1Color', p1Color);

    const [p2, setP2] = useState(40);
    const [p2Color, setP2Color] = useState('#0073ff');
    // console.log('p2Color', p2Color);

    const [p3, setP3] = useState(40);
    const [p3Color, setP3Color] = useState('#f63030');
    // console.log('p3Color', p3Color);

    const [p4, setP4] = useState(40);
    const [p4Color, setP4Color] = useState('#ff9900');
    // console.log('p4Color', p4Color);

  return(
    <div>
        <Typography align='center' variant="h3" gutterBottom>{heading}</Typography>

        <div className={classes.phoneView}>

            {/* 3RD PLAYER */}
            <div className={classes.normal}>
                {totalPlayers >= 3 ?
                <div>
                    <Card className={classes.root} style={{backgroundColor: p3Color}}>
                        <CardContent >
                            <ColorPicker
                                align="center"
                                name='color'
                                label='Pick A Color'
                                // defaultValue='#FFFFFF'
                                value={p3Color} 
                                onChange={color => setP3Color(color)}
                            />
                            
                            <Button fullWidth={true} size="large" variant="text" width="400px" onClick={()=>setP3(p3 + 1)} 
                            // onMouseDown={()=>setP1(p1 + 10)}
                            >+</Button>

                            <Typography variant="h5" component="h2" align="center">
                            Player 3
                            </Typography>

                            <Typography variant="h5" component="h2" align="center">
                            {p3}
                            </Typography>

                            <Button fullWidth={true} size="large" onClick={()=>setP3(p3 - 1)}>-</Button>
                        </CardContent>
                    </Card>
                </div>
                :
                <></>
                }
            </div>

            {/* 4th PLAYER */}
            <div className={classes.normal}>
                {totalPlayers >= 4 ?
                <div>
                    <Card className={classes.root} style={{backgroundColor: p4Color}}>
                        <CardContent >
                            <ColorPicker
                            align="center"
                                name='color'
                                label='Pick A Color'
                                // defaultValue='#FFFFFF'
                                value={p4Color} 
                                onChange={color => setP4Color(color)}
                            />
                            
                            <Button fullWidth={true} size="large" variant="text" width="400px" onClick={()=>setP4(p4 + 1)} 
                            // onMouseDown={()=>setP4(p4 + 10)}
                            >+</Button>

                            <Typography variant="h5" component="h2" align="center">
                            Player 4
                            </Typography>

                            {/* <TextField id="standard-basic" label="Player Name" /> */}


                            <Typography variant="h5" component="h2" align="center">
                            {p4}
                            </Typography>

                            <Button fullWidth={true} size="large" onClick={()=>setP4(p4 - 1)}>-</Button>
                        </CardContent>
                    </Card>
                </div>
                :
                <></>
                }
            </div>
            {/* 1ST PLAYER */}
            <div className={classes.normal}>
                <Card className={classes.root} style={{backgroundColor: p1Color}}>
                    <CardContent >
                        <ColorPicker
                        align="center"
                            name='color'
                            label='Pick A Color'
                            // defaultValue='#FFFFFF'
                            value={p1Color} 
                            onChange={color => setP1Color(color)}
                        />
                        
                        <Button fullWidth={true} size="large" variant="text" width="400px" onClick={()=>setP1(p1 + 1)} 
                        // onMouseDown={()=>setP1(p1 + 10)}
                        >+</Button>

                        <Typography variant="h5" component="h2" align="center">
                        Player 1
                        </Typography>

                        <Typography variant="h5" component="h2" align="center">
                        {p1}
                        </Typography>

                        <Button fullWidth={true} size="large" onClick={()=>setP1(p1 - 1)}>-</Button>
                    </CardContent>
                </Card>
            </div>

            {/* 2ND PLAYER */}
            <div className={classes.normal}>
                <Card className={classes.root} style={{backgroundColor: p2Color}}>
                    <CardContent >
                        <ColorPicker
                        align="center"
                            name='color'
                            label='Pick A Color'
                            // defaultValue='#FFFFFF'
                            value={p2Color} 
                            onChange={color => setP2Color(color)}
                        />
                        
                        <Button fullWidth={true} size="large" variant="text" width="400px" onClick={()=>setP2(p2 + 1)} 
                        // onMouseDown={()=>setP1(p1 + 10)}
                        >+</Button>

                        <Typography variant="h5" component="h2" align="center">
                        Player 2
                        </Typography>

                        <Typography variant="h5" component="h2" align="center">
                        {p2}
                        </Typography>

                        <Button fullWidth={true} size="large" onClick={()=>setP2(p2 - 1)}>-</Button>
                    </CardContent>
                </Card>
            </div>

        </div>
    </div>
  );
}

export default connect(mapStoreToProps)(LifeTotal);
