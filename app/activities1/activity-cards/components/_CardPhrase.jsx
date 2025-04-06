/* _CardPhrase.jsx */
function CardPhrase({ themeImage, actionPhrase, phraseFocusRef, themeForThemeImage }) {
    return (
        <>
            <div className='theme_image'>
                <img src={themeImage} alt='ambience.LIFE theme image' aria-label={themeForThemeImage} />
            </div>
            <p className='card_phrase' ref={phraseFocusRef}>
                {actionPhrase}
            </p>
        </>
    )
}

export default CardPhrase
