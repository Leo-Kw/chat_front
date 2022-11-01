import { keyframes } from 'styled-components'

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

export const fadeInUp = keyframes`
  from {
    opacity: 0;
    -webkit-transform: translate(0, 10px);
  }
  to {
    opacity: 1;
    -webkit-transform: translate(0);
  }
`

export const fadeInDown = keyframes`
  from {
    opacity: 1;
    -webkit-transform: translate(0, -10px);
  }
  to {
    opacity: 0;
    -webkit-transform: translate(0);
  }
`

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const growLine = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`

export const scaleIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.4);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`

export const scaleOut = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.4);
  }
`

export const rotate360 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
