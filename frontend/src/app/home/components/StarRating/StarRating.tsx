const StarRating = ({ rating }) => {
    const fullStar = Math.floor(rating / 2);
    const halfStar = rating % 2;
    const emptyStar = 5 - fullStar - (halfStar ? 1 : 0);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '8px' }}>{(rating / 2).toFixed(1)}</span>
            {'★'.repeat(fullStar)}
            {halfStar > 0 && (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1">
                    <defs>
                        <linearGradient id="half-fill">
                            <stop offset="50%" stop-color="currentColor"/>
                            <stop offset="50%" stop-color="transparent" stop-opacity="1"/>
                        </linearGradient>
                    </defs>
                    <path d="M12 .587l3.668 7.431 8.332 1.209-6.001 5.847 1.416 8.251L12 18.896l-7.415 3.9 1.416-8.251-6.001-5.847 8.332-1.209L12 .587z" fill="url(#half-fill)"/>
                </svg>
            )}
            {'☆'.repeat(emptyStar)}
        </div>
    );
};

export default StarRating;