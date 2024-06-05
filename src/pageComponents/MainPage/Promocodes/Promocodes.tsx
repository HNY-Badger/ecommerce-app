import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import * as styles from './Promocodes.module.css';
import { Promocode } from '../../../types/promocode';
import Spinner from '../../../components/Spinner/Spinner';
import { useAppDispatch } from '../../../store/hooks/redux';
import { notify } from '../../../store/reducers/NotificationSlice';
import PromocodeAPI from '../../../api/promocode';
import { APIErrorResponse } from '../../../types/api';

type PromocodesState = {
  codes: Promocode[];
  error: string;
  loading: boolean;
};

function Promocodes() {
  const dispatch = useAppDispatch();
  const [codeState, setCodeState] = useState<PromocodesState>({
    codes: [],
    error: '',
    loading: false,
  });

  useEffect(() => {
    PromocodeAPI.getActivePromocodes()
      .then((resp) => setCodeState((prev) => ({ ...prev, loading: false, codes: resp.results })))
      .catch((e: AxiosError<APIErrorResponse>) =>
        setCodeState((prev) => ({ ...prev, error: e.response?.data.message ?? 'Unexpected error occured' }))
      );
  }, []);

  const codeClickHandler = (code: string) => {
    navigator.clipboard.writeText(code);
    dispatch(notify({ text: `Copied: ${code}`, type: 'success' }));
  };

  return (
    <div className={styles.promocodes}>
      <h3>Active promocodes</h3>
      {!codeState.loading ? (
        <div className={styles.codes}>
          {codeState.error.length === 0 ? (
            codeState.codes.map((code) => (
              <button type="button" onClick={() => codeClickHandler(code.code)} key={code.id} className={styles.code}>
                {code.code}
              </button>
            ))
          ) : (
            <p>{codeState.error}</p>
          )}
        </div>
      ) : (
        <div>
          <Spinner width="32px" />
        </div>
      )}
    </div>
  );
}

export default Promocodes;
