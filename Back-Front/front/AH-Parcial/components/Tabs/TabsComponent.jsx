import { useState } from "react" 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        className="list"
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
}

function TabsComponent({label1, label2, children1, children2}) {
    const [value, setValue] = useState(0);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const a11yProps = (index) => {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <div >
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label={label1} {...a11yProps(0)} />
                <Tab label={label2} {...a11yProps(1)} />
            </Tabs>
            <CustomTabPanel value={value} index={0}>{children1}</CustomTabPanel>
            <CustomTabPanel value={value} index={1}>{children2}</CustomTabPanel>
        </div>
    )
}

export default TabsComponent;