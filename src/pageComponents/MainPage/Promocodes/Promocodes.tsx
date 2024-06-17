import React, { useEffect } from 'react';
import * as styles from './Promocodes.module.css';
import Spinner from '../../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { notify } from '../../../store/reducers/NotificationSlice';
import fetchActivePromocodes from '../../../store/async/PromocodesThunk';

function Promocodes() {
  const dispatch = useAppDispatch();
  const { data: codes, loading, error } = useAppSelector((state) => state.promocodesReducer);

  useEffect(() => {
    if (codes === null) {
      dispatch(fetchActivePromocodes());
    }
  }, []);

  const codeClickHandler = (code: string) => {
    navigator.clipboard.writeText(code);
    dispatch(notify({ text: `Copied: ${code}`, type: 'success' }));
  };

  return (
    <div className={styles.promocodes}>
      <h3>Active promocodes</h3>
      {!loading ? (
        <div className={styles.codes}>
          {error.length === 0 && codes != null ? (
            codes.map((code) => (
              <button type="button" onClick={() => codeClickHandler(code.code)} key={code.id} className={styles.code}>
                <div>
                  <p>{code.code}</p>
                  {code.description['en-US'].length > 0 && (
                    <span className={styles.tooltip}>{code.description['en-US']}</span>
                  )}
                </div>
              </button>
            ))
          ) : (
            <p>{error}</p>
          )}
        </div>
      ) : (
        <div className={styles.loading}>
          <Spinner width="32px" />
        </div>
      )}
    </div>
  );
}

export default Promocodes;
