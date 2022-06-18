
    // Safari now suddenly blocks iframe cookie access, so we need to call this during some user interaction
    function safariFix() {
    if (typeof document.hasStorageAccess === 'function'
        && typeof document.requestStorageAccess === 'function') {
    document.requestStorageAccess().then(() => {
    // Now we have first-party storage access!
    console.log("Got cookie access for Safari workaround");
    // Let's access some items from the first-party cookie jar
    document.cookie = "foo=bar";              // drop a test cookie
},  () => { console.log('access denied') }).catch((error) => {
    // error obtaining storage access.
    console.log("Could not get access for Safari workaround: " + error);
});
}
}
