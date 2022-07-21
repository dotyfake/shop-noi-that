import { useEffect } from 'react';
import styled from 'styled-components';

const CommentFB = () => {
    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }

        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '768469081247705',
                cookie: true, // enable cookies to allow the server to access
                // the session
                xfbml: true, // parse social plugins on this page
                version: 'v2.5', // use version 2.1
            });
        };
        // Load the SDK asynchronously
        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = `//connect.facebook.net/vi_VN/sdk.js`;
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    });
    return (
        <Wrapper>
            <div
                className="fb-comments"
                data-href="https://www.facebook.com/noithatsonla/"
                data-width=""
                data-numposts=""
            ></div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;
export default CommentFB;
