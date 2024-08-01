import { useEffect } from 'react';

const useKeyboard = (key: string, callback: () => void) => {
	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === key) {
				e.preventDefault();
				callback();
			}
		};
		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, [key, callback]);
}

export default useKeyboard;
