import React from 'react';
import './sideDrawer.styles.css';
import CreateIcon from '@material-ui/icons/Create';
import VisibilityIcon from '@material-ui/icons/Visibility';

const SideDrawer = (props) => {
    const autoHeight = (e) => {
        const clicked = e.target
        const element = clicked.closest('.toggelable')
        element.classList.toggle('auto_height')
    }
    const toggleSidebar = () => {
        const sidebar = document.getElementById('side_bar');
        sidebar.classList.toggle('toggle_sidebar')
      }
    return (
        <div className="side_drawer" id="side_bar">
            <div className="header">
                Credentials
                <div className="header_tag">
                    admin
                </div>
            </div>
            <div onClick={(e)=>autoHeight(e)} className="toggelable">
                <CreateIcon/>
                <div className="action">Create</div> 
                <div className="menu">
                    <div className="item" onClick={()=> {props.setActiveTab('make'); toggleSidebar()}}>
                        Make
                    </div>
                    <div className="item" onClick={()=> {props.setActiveTab('model'); toggleSidebar()}}>
                        Model
                    </div>
                    <div className="item" onClick={()=> {props.setActiveTab('trim'); toggleSidebar()}}>
                        Trim
                    </div>
                </div>
            </div>
            <div onClick={(e)=>autoHeight(e)} className="toggelable">
                <VisibilityIcon/>
                <div className="action">View</div> 
                <div className="menu">
                    <div className="item">
                        Make
                    </div>
                    <div className="item">
                        Model
                    </div>
                    <div className="item">
                        Trim
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default SideDrawer;
