import { css } from '@emotion/css';

export const projectCardWrapperStyles = css`
    display: flex;
    flex-direction: column;
    flex-grow: 0;
`;

export const projectCardMediaStyles = (url?: string) => css`
    width: 320px;
    height: 360px;
    background-color: #000;
    background-image: url(${url});
    background-position: center center;
    background-size: cover;
    border-radius: 32px;
`;

export const projectCardCanvasStyles = css`
    width: 320px;
    height: 360px;
    border-radius: 32px;
    animation: fade-in 2s;

    @keyframes fade-in {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
`;

export const projectCardContentStyles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 32px;
    color: var(--text-light-color);
`;

export const projectCardUpdatedAtStyles = css`
    color: var(--text-neutral-color);
`;
