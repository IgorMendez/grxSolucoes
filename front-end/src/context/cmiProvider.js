import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cmiContext from './cmiContext';

export default function CmiProvider({ children }) {
  const context = useMemo(() => ({ data: false }), []);

  return (
    <cmiContext.Provider value={context}>
      { children }
    </cmiContext.Provider>
  );
}

CmiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
