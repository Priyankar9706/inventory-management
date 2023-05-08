import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
    body: {
        fontSize: 12,
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
      },
  table: {
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #EEE',
    paddingTop: 8,
    paddingBottom: 8,
  },
  header: {
    borderTop: 'none',
  },
  bold: {
    fontWeight: 'bold',
  },
  // So Declarative and unDRY 👌

  row2: {
    width: '15%',
    textAlign:'center'
  },

  grand:{
    float:'right',
    fontWeight:'ultrabold'
  }
})

const ReportTable = ({ cartItems, grandTotal }) => {
  return (

    <Document>
         <Page style={styles.body}>
    <View style={styles.table}>
      <View style={[styles.row, styles.bold, styles.header]}>
        <Text style={styles.row2}>Sl. No.</Text>
        <Text style={styles.row2}>Item Name</Text>
        <Text style={styles.row2}>Category</Text>
        <Text style={styles.row2}>Price</Text>
        <Text style={styles.row2}>Quantity</Text>
        <Text style={styles.row2}> Total Rate</Text>
      </View>
      {cartItems.map((cartItem, i) => (
        <View key={i} style={styles.row} wrap={false}>
                 <Text style={styles.row2}>{i+1}</Text>
                 <Text style={styles.row2}>{cartItem.item}</Text>
                 <Text style={styles.row2}>{cartItem.category}</Text>
                 <Text style={styles.row2}>{cartItem.price}/{cartItem.unit}</Text>
                 <Text style={styles.row2}>{cartItem.quantity} {cartItem.unit}</Text>
                 <Text style={styles.row2}>{cartItem.totalRate}</Text>      
        </View>
      ))}
      <View  style={styles.row} wrap={false}>
                <Text style={[styles.row2,styles.bold ,styles.grand]}></Text>
                <Text style={[styles.row2,styles.bold,styles.grand]}></Text>
                <Text style={[styles.row2,styles.bold ,styles.grand]}></Text>
                <Text style={[styles.row2,styles.bold,styles.grand]}></Text>
                <Text style={[styles.row2,styles.grand]}>Grand Total</Text>
                <Text style={[styles.row2,styles.grand]}>{grandTotal}</Text>
      </View>
    </View>
    </Page>
    </Document>
  )
}

ReportTable.propTypes = {
    cartItems: PropTypes.array.isRequired,
    grandTotal: PropTypes.number.isRequired,
  }

export default ReportTable