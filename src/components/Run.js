import hol from '../assets/mario-run/hol.png';
import stand from '../assets/mario-run/stand.png';
import fall from '../assets/mario-run/fall.png';
import perRun from '../assets/mario-run/per-run.png';
import run from '../assets/mario-run/run-r.png';
import turn from '../assets/mario-run/turn.png';
import perTurn from '../assets/mario-run/per-turn.png';
import pull from '../assets/pull.png';
import { useEffect, useRef, useState, useTransition } from 'react';
import { useLoading } from '../lib/loading';

export default function Run({ children }) {
  const statusMario = {
    FALL: { image: fall, value: 'fall', timeout: 20 },
    RUN_LEFT: { image: run, value: 'run', isFlip: true },
    RUN_RIGHT: { image: run, value: 'run_right' },
    PERRUN: { image: perRun, value: 'perpare_run' },
    PERRUN_RIGHT: { image: perRun, value: 'perpare_run', isFlip: true },
    TURN: { image: turn, value: 'turn' },
    TURN_RIGHT: { image: turn, value: 'turn_right' },
    PERTURN: { image: perTurn, value: 'perpare_turn' },
    PERTURN_RIGHT: {
      image: perTurn,
      value: 'perpare_turn_right',
      isFlip: true,
    },
    STAND: { image: stand, value: 'stand' },
    STAND_RIGHT: { image: stand, value: 'stand_right', isFlip: true },
    DONE: { value: 'done' },
  };

  const [step, setStep] = useState(statusMario.FALL);
  const [isAuto, setIsAuto] = useState(true);
  const [isPending, startTransition] = useTransition();

  const marioRef = useRef(null);
  const holeRef = useRef(null);
  const loadingRef = useRef(null);

  const { isLoading, setIsLoading } = useLoading();
  let status;

  useEffect(() => {
    if (step.value === statusMario.DONE.value) {
      setTimeout(() => {
        setIsLoading(true);
        console.log('loading');
      }, 500);
    }
    if (!isAuto) {
      return;
    }
    const timeout = step.timeout ?? 50;
    const jump = setInterval(() => {
      const holeTop = holeRef.current.offsetTop;

      const holeHeight = holeRef.current.offsetHeight;
      const positionLand = holeTop + holeHeight / 2;
      switch (step.value) {
        //falling
        case statusMario.FALL.value:
          let nextFallIn = marioRef.current.offsetTop + 10;
          if (nextFallIn > positionLand) {
            nextFallIn = positionLand + 10;
            setStep(statusMario.STAND);
          }
          marioRef.current.style.top = `${nextFallIn}px`;
          break;
        case statusMario.STAND.value:
          setStep(statusMario.PERTURN);
          break;

        case statusMario.PERTURN.value:
          setStep(statusMario.TURN);
          break;
        case statusMario.TURN.value:
          setStep(statusMario.PERTURN_RIGHT);
          break;
        case statusMario.PERTURN_RIGHT.value:
          setStep(statusMario.STAND_RIGHT);
          setIsAuto(false);
          _setDom(marioRef, loadingRef, statusMario.STAND_RIGHT);
          break;

        default:
          break;
      }
    }, timeout);

    return () => {
      clearInterval(jump);
    };
  }, [step]);
  useEffect(() => {
    if (step.value === statusMario.DONE.value) {
      return;
    }
    window.onkeydown = function (e) {
      let currentLeft = marioRef.current.offsetLeft;
      let holeLeft = holeRef.current.offsetLeft;
      let holeWidth = holeRef.current.offsetWidth;
      // timeOutStand && clearTimeout(timeOutStand);
      if (!isAuto) {
        if (step.value === statusMario.DONE.value) {
          return;
        }
        if (e.keyCode === 39) {
          const moveDistant = currentLeft + 10;
          marioRef.current.style.left = `${moveDistant}px`;
          if (moveDistant > holeLeft - holeWidth) {
            startTransition(() => setStep(statusMario.DONE));

            return window.removeEventListener('keydown', () => {});
          }

          status = statusMario.RUN_RIGHT;

          setTimeout(() => {
            _setDom(marioRef, loadingRef, statusMario.STAND_RIGHT);
          }, 200);
        }

        if (e.keyCode === 37 && currentLeft > 0) {
          const moveDistant = currentLeft - 10;
          status = statusMario.RUN_LEFT;

          marioRef.current.style.left = `${
            moveDistant < 0 ? 0 : moveDistant
          }px`;
          setTimeout(() => {
            _setDom(marioRef, loadingRef, statusMario.STAND);
          }, 200);
        }
        _setDom(marioRef, loadingRef, status);
      }
    };
    return () => {
      window.removeEventListener('keydown', () => {});
    };
  }, [isAuto, step]);
  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-white z-10 flex flex-wrap items-center '>
      <div className='relative flex-1  ml-[20px] box-border h-full'>
        <img
          ref={marioRef}
          className={`absolute h-[40px] object-contain top-0  ${
            step.isFlip && isAuto && 'scale-x-[-1]'
          }  left-1/2 -translate-y-[25px]`}
          src={step.image}
          alt='mario'
        />
        <div className='loading border w-full absolute h-[10px] top-[53%] overflow-hidden'>
          <p
            ref={loadingRef}
            className='h-full w-20 bg-main transition-all'></p>
        </div>
      </div>
      <div className='w-fit'>
        <img
          ref={holeRef}
          className='rotate-[270deg] w-[50px]  object-contain'
          src={hol}
          alt='hole'
        />
      </div>

      <div
        className={`  ${
          step.value === statusMario.DONE.value && 'game-close '
        } fixed top-0 left-0 w-screen h-screen bg-main z-10 flex justify-center  ${
          step.value === statusMario.DONE.value ? '' : '-translate-y-full'
        }`}>
        <img
          className='absolute bottom-0 translate-y-full '
          src={pull}
          alt='hole'
        />
      </div>
    </div>
  );
}

function _setDom(element, loadingEl, status) {
  const left = loadingEl.current.offsetLeft;
  console.log(left);
  loadingEl.current.style.width = `${element.current.offsetLeft}px`;
  status.image && (element.current.src = status.image);
  element.current.style.transform = `${
    status?.isFlip ? 'scaleX(-1)' : 'scaleX(1)'
  } translateY(-25px)`;
}
