import React from 'react';
import {Button,Label,CustomInput} from 'reactstrap';
import axios from 'axios';


export default class FileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileIP: "",
            fileId : 0,
            filePath : '',
            uploadStatus: false
        };
    }

    componentDidMount() {
        const parentThis = this;
        parentThis.state.fileIP = window.location.origin;
    }

    putFile(stream, name, size,type,desc){

        let formData = new FormData();
        formData.append('filters', JSON.stringify({ name: name, size : size, type: type, desc: desc }));
        formData.append('file', stream);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return formData;
        // console.log(formData);
        /*return axios.post(`${env.FILE_UPLOAD_URI}/saveFile?_format=json`, formData, config)
            .then(res => res.data)
            .catch(error => error);*/
    }

    fileUpload = (e) => {
        const parentThis = this;
        const state = parentThis.state;
        var image = e.target.files[0];
        // console.log(e.target.files);
        const validExt = ['image/png', 'image/jpeg', 'image/jpg' , image.type];
        const contentType = parentThis.props.contentType;
        if (image.name !== undefined) {
            if (image.type === 'image/png' || image.type === 'image/jpg' || image.type === 'image/jpeg') {
                var size = image.size / 1024 / 1024;
                if (size <= 5) {
                    state.fileId = '';
                    state.uploadStatus = true;
                    parentThis.setState(state);
                    // console.log(image, validExt, contentType);
                    /*console.log(image);
                    console.log(image.name);
                    console.log(image.size);
                    console.log(image.type);
                    console.log('desc');*/
                    /*this.putFile(image, image.name, image.size,image.type,'constDesc').then(res => {
                        console.log(res);
                        if (res.status === 'success' && res.code === '201') {
                            state.fileId = res.data[0].id;
                            state.filePath = res.data[0].filePath;
                            state.uploadStatus = false;
                            parentThis.setState(state);
                        }
                    }).catch(err => {
                        console.log(err);
                    });*/

                    let formData = new FormData();
                    formData.append('filters', JSON.stringify({ name: image.name, size : image.size, type: image.type, desc: 'constDesc' }));
                    formData.append('file', image);
                    console.log(formData);
                    const config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    };
                    axios.post(`http://f6781c6a.ngrok.io/api/file/upload`, formData, config)
                        .then(res => {
                            console.log(res);
                        })
                        .catch(error => error)
                }
            }
        }
    }

    render() {
        const parentThis = this;
        const state = parentThis.state;
        return (
            <div className="file pointer overflow relative thin-border-dashed padding-0-5x white" style={{height:60}}>
                {
                    state.fileId === '' && state.filePath === ''?
                        <span >Loading</span>
                        :
                        state.filePath === ''?
                            <div>
                                <Button color={'light'} className={'thin-border'}>
                                    <img src={this.state.fileIP+"/static/images/folder.png"} style={{zoom: "5%"}}/>
                                </Button>
                                <Label className={'ml-3 grey-text text-darken-3 bolder mb-0'}>Upload File
                                    <CustomInput type="file" name="file" accept="image/png, image/jpeg, image/jpg" style={{height:60}}
                                                 className={'absolute font-5x no-opacity right-off top-off full-width'} onChange={parentThis.fileUpload.bind(this)}/>
                                </Label>
                            </div>
                            :
                            <img alt={`uploaded-image`} src={`${env.SPACES_END_POINT}/${state.filePath}`} style={{zoom: "20%"}}/>
                }
            </div>
        )
    }
}
