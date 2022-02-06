/**
 * @description
 * <%= description %>
 * @author <%= author %>
 * @email <%= email %>
 * @created_at <%= created_at %>
 */
import React, { useEffect, useState } from 'react';

export default = (inInitial) => {
  const [ value, setValue ] = useState(inInitial);

  useEffect(() => {
    console.log('code.');
    return () => {
      console.log('destroy.');
    }
  }, [value]);

  return [ value ];
}
