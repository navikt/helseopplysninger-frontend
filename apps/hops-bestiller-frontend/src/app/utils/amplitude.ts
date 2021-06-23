import amplitude from 'amplitude-js'


const initAmplitude = () => {
    amplitude.getInstance().init("API_KEY");

}


export default initAmplitude
