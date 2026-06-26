tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            "colors": {
                "surface-container-low": "#131b2e",
                "surface-tint": "#00dbe7",
                "on-primary-container": "#006a71",
                "surface-bright": "#31394d",
                "inverse-surface": "#dae2fd",
                "surface-container-lowest": "#060e20",
                "secondary-container": "#14d1ff",
                "on-surface": "#dae2fd",
                "background": "#0b1326",
                "on-background": "#dae2fd",
                "primary-container": "#00f2ff",
                "outline": "#849495",
                "on-surface-variant": "#b9cacb",
                "outline-variant": "#3a494b",
                "surface-container": "#171f33",
                "primary": "#e1fdff",
                "surface-dim": "#0b1326",
                "error": "#ffb4ab",
                "surface-variant": "#2d3449",
                "secondary": "#a6e6ff",
                "surface": "#0b1326",
                "surface-container-highest": "#2d3449",
                "surface-container-high": "#222a3d",
                "primary-fixed-dim": "#00dbe7",
                "on-primary-fixed": "#002022"
            },
            "borderRadius": {
                "DEFAULT": "0.125rem",
                "lg": "0.25rem",
                "xl": "0.5rem",
                "full": "0.75rem"
            },
            "spacing": {
                "stack-sm": "8px",
                "stack-md": "16px",
                "margin-mobile": "16px",
                "section-gap": "80px",
                "gutter": "24px",
                "stack-lg": "32px",
                "container-max": "1200px"
            },
            "fontFamily": {
                "body-md": ["Geist"],
                "display-lg": ["Geist"],
                "headline-lg": ["Geist"],
                "label-md": ["JetBrains Mono"],
                "headline-md": ["Geist"],
                "code-sm": ["JetBrains Mono"]
            },
            "fontSize": {
                "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
                "display-lg": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "700"}],
                "headline-lg": ["32px", {"lineHeight": "1.2", "fontWeight": "600"}],
                "label-md": ["14px", {"lineHeight": "1.4", "letterSpacing": "0.02em", "fontWeight": "500"}],
                "headline-md": ["24px", {"lineHeight": "1.3", "fontWeight": "600"}],
                "code-sm": ["12px", {"lineHeight": "1.4", "fontWeight": "400"}]
            }
        },
    },
};
