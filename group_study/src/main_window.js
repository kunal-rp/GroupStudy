import React, { Component } from 'react';
import './App.css';

export default class Main_Window extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const subjects=this.props.subjects;
        // for each subject
        const subjects_array=subjects.map( (subject) => {
            return(
                <div key={subjects.subject_name} className="subjects_container">
                    <div className="subject_name">
                        {subject.subject_name}
                    </div>
                    <div>
                        {subject.courses.map((course => {

                            return(
                            
                                <div key={course} className="courses" > 
                                    <a href="#">
                                        {course}
                                    </a>
                                </div>
                            
                            )

                        }))}
                    </div> 
                </div>
            )
        } );
        return (
            <div className='main-window-container'>
                <h2>Main Window</h2>
                {subjects_array}
            </div>
        )
    }
}