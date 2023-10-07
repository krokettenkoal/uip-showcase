<h1>
    <slot />
</h1>

<style>
    h1 {
        font-size: 5rem;
        font-weight: bold;
        background: radial-gradient(circle at bottom right, #e52e71, #ff8a00);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 200% 200%;
        -webkit-animation: hero-bg 30s ease infinite;
        -moz-animation: hero-bg 30s ease infinite;
        animation: hero-bg 30s ease infinite, fly-in-Y 500ms ease-out 0ms 1 both;
        text-align: center;
    }

    @media screen and (max-width: 768px){
        h1 {
            font-size: 3rem;
        }
    }
</style>