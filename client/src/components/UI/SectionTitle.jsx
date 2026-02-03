import React from 'react';

const SectionTitle = ({
    title,
    subtitle,
    description,
    align = 'center',
    badge,
    className = ''
}) => {
    const alignments = {
        left: 'text-start',
        center: 'text-center mx-auto',
        right: 'text-end ms-auto'
    };

    return (
        <div className={`mb-5 ${alignments[align]} ${className}`} style={{ maxWidth: '48rem' }}>
            {badge && (
                <span className="badge-pill-custom badge-sky d-inline-block mb-3">
                    {badge}
                </span>
            )}

            <h2 className="display-5 fw-bold text-dark mb-3" style={{ color: 'var(--text-primary)' }}>
                {title}
            </h2>

            {subtitle && (
                <p className="fs-5 fw-medium text-gradient-primary mb-3">
                    {subtitle}
                </p>
            )}

            {description && (
                <p className="lead text-secondary mb-0" style={{ lineHeight: 1.7 }}>
                    {description}
                </p>
            )}

            <div
                className="mt-4 rounded-pill mx-auto"
                style={{
                    height: '4px',
                    width: '5rem',
                    background: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)',
                    marginLeft: align === 'left' ? 0 : align === 'right' ? 'auto' : undefined
                }}
            />
        </div>
    );
};

export default SectionTitle;
