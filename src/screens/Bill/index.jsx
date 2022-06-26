import React from 'react';
import Bill from '../../views/Bill';

function BillView({navigation, route}) {
  return <Bill navigation={navigation} route={route} />;
}

export default BillView;
