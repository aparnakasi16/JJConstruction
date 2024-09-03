import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {CheckBox} from '@rneui/themed';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Toast from 'react-native-simple-toast'
import { useDispatch, useSelector } from 'react-redux';
import { newEnquiry } from '../../redux/modules/projects/projectReducer';
import { useNavigation } from '@react-navigation/native';

// Roofing installation
// Exterior and interior wall construction
// Electrical, plumbing, and HVAC installation
// Flooring, tiling, and painting

function Services(props) {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [services, setServices] = useState();
  const [location, setLocation] = useState('');
  const [builtYesCheck, setBuiltYesCheck] = useState(true);
  const [builtNoCheck, setBuiltNoCheck] = useState(false);
  const [warrantyCheck, setWarrantyCheck] = useState(true);
  const [warrantyUnCheck, setWarrantyUnCheck] = useState(false);
  const [handOveryear, setHandOveryear] = useState();
  const userDetails = useSelector(state=>state.auth.userDetails)
  const [visitDate, setVisitDate] = useState(
    new Date(Date.now() + 2 * (60 * 60 * 1000)),
  );
  const [dateOpen, setDateOpen] = useState(false);

  const toggleCheckbox = () => {
    if (builtNoCheck) {
      setBuiltNoCheck(false);
    }
    setBuiltYesCheck(!builtYesCheck);
  };
  const toggleCheckboxNo = () => {
    if (builtYesCheck) {
      setBuiltYesCheck(false);
    }
    setBuiltNoCheck(!builtNoCheck);
  };

  const WarrantyCheckToggle = () => {
    if (warrantyUnCheck) {
      setWarrantyUnCheck(false);
    }
    setWarrantyCheck(!warrantyCheck);
  };
  const WarrantyUncheckToggle = () => {
    if (warrantyCheck) {
      setWarrantyCheck(false);
    }
    setWarrantyUnCheck(!warrantyUnCheck);
  };

  const [servicesDropDown, setServicesDropDown] = useState([
    {value: 'Electrical', label: 'Electrical'},
    {value: 'Plumbing', label: 'Plumbing'},
    {value: 'Flooring', label: 'Flooring'},
    {value: 'Tiling', label: 'Tiling'},
    {value: 'Painting', label: 'Painting'},
  ]);

  const raiseEnquiry = () => {
    if(services == undefined){
        Toast.show('Nature of work is required')
    }
    else if(!location?.trim()){
        Toast.show('Enter Location') 
    }
    else if(!handOveryear){
        Toast.show('Enter Handover Year') 
    }
    else{
    let payload ={
        'workNature': services,
        'location' : location,
        'jjbuilt': builtYesCheck? true : false,
        'underWarranty':warrantyCheck ? true : false,
        'handOverYear': handOveryear,
        'visitDate': moment(visitDate),
        'username':userDetails?.name,
        'phone':userDetails?.phone,
        'userId':userDetails?.userId
    }
    console.log('payload here', payload)
    dispatch(newEnquiry(payload)).then((res)=>{
        console.log('response enquiryy', res?.payload)
        if(res?.payload?.success){
          Toast.show('Enquiry created successfully',Toast.LONG)
          navigation.navigate('Home')         
        }
    })
    }
  };

  return (
    <View style={styles.parentContainer}>
      <Text style={styles.headerText}>Repair & Info</Text>
      <View style={[styles.pd10, {zIndex: 3000}]}>
        <DropDownPicker
          theme={'LIGHT'}
          open={open}
          value={value}
          items={servicesDropDown}
          setOpen={setOpen}
          setValue={setValue}
          onChangeValue={value => {
            setServices(value);
          }}
          placeholder="Nature of work"
          placeholderStyle={{color: '#005248'}}
          style={{backgroundColor: '#fff', borderWidth: 0}}
          dropDownContainerStyle={{backgroundColor: '#fff'}}
          textStyle={{color: '#005248'}}
          arrowIconStyle={{borderStartColor: '#005248'}}
        />
      </View>
      <View style={styles.pd10}>
        <TextInput
          style={styles.input}
          placeholder="Enter Location"
          placeholderTextColor="#005248"
          onChangeText={text => setLocation(text)}
        />
      </View>
      <View>
        <Text style={styles.subText}>
          Is the property built by JJ Construction ?
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', width: '50%'}}>
            <CheckBox
              checked={builtYesCheck}
              onPress={toggleCheckbox}
              // Use ThemeProvider to make change for all checkbox
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor={'#FFA500'}
              containerStyle={{backgroundColor: 'transparent'}}
              wrapperStyle={{backgroundColor: 'transparent'}}
            />
            <Text style={{alignSelf: 'center', right: 15, color: '#fff'}}>
              Yes
            </Text>
          </View>
          <View style={{flexDirection: 'row', width: '50%'}}>
            <CheckBox
              checked={builtNoCheck}
              onPress={toggleCheckboxNo}
              // Use ThemeProvider to make change for all checkbox
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor={'#FFA500'}
              containerStyle={{backgroundColor: 'transparent'}}
              wrapperStyle={{backgroundColor: 'transparent'}}
            />
            <Text style={{alignSelf: 'center', right: 15, color: '#fff'}}>
              No
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.pd10}>
        <Text style={styles.subText}>
          Is your property still under service warranty ?
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', width: '50%'}}>
            <CheckBox
              checked={warrantyCheck}
              onPress={WarrantyCheckToggle}
              // Use ThemeProvider to make change for all checkbox
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor={'#FFA500'}
              containerStyle={{backgroundColor: 'transparent'}}
              wrapperStyle={{backgroundColor: 'transparent'}}
            />
            <Text style={{alignSelf: 'center', right: 15, color: '#fff'}}>
              Yes
            </Text>
          </View>
          <View style={{flexDirection: 'row', width: '50%'}}>
            <CheckBox
              checked={warrantyUnCheck}
              onPress={WarrantyUncheckToggle}
              // Use ThemeProvider to make change for all checkbox
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor={'#FFA500'}
              containerStyle={{backgroundColor: 'transparent'}}
              wrapperStyle={{backgroundColor: 'transparent'}}
            />
            <Text style={{alignSelf: 'center', right: 15, color: '#fff'}}>
              No
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.pd10}>
        <TextInput
          style={styles.input}
          placeholder="Year of Handover"
          placeholderTextColor="#005248"
          onChangeText={text => setHandOveryear(text)}
        />
      </View>

      <View style={styles.pd10}>
        <Text style={styles.subText}>When can we visit the site?</Text>
      </View>

      <View
        style={{
          zIndex: 50,
          width: '100%',
          alignSelf: 'center',
          backgroundColor: '#fff',
          borderRadius: 10,
          paddingLeft: 10,
          justifyContent: 'center',
          height: 50,
          // opacity: 0.7,
          top: 10,
        }}>
        <TouchableOpacity
          onPress={() => setDateOpen(true)}
          style={[
            {
              justifyContent: 'center',
              backgroundColor: '',
              borderColor: '#fff',
              height: 50,
              width: '90%',
            },
          ]}>
          <Text
            style={[
              // styles.placeholderStyle,
              {
                color: '#005248',
                textAlignVertical: 'center',
              },
            ]}>
            {moment(visitDate).format('lll')}
          </Text>
        </TouchableOpacity>
      </View>
      {
        <DatePicker
          modal
          mode="datetime"
          title="Site Visit date"
          open={dateOpen}
          date={new Date(Date.now() + 2 * (60 * 60 * 1000))}
          onConfirm={date => {
            console.log('date here', date);
            setDateOpen(false);
            // setSelectedDate(date)
            setVisitDate(date);
          }}
          onCancel={() => {
            setVisitDate(new Date(Date.now() + 2 * (60 * 60 * 1000)));
            setDateOpen(false);
          }}
          theme="light"
          dividerColor={'#005248'}
          buttonColor={'#FFA500'}
          minimumDate={new Date()}
        />
      }

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => raiseEnquiry()}>
          <Text style={styles.loginButtonText}>Raise Enquiry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: '#005248',
    paddingTop: 60,
    padding: 10,
  },
  headerText: {
    color: '#FFA500',
    fontWeight: '600',
    fontSize: 18,
  },
  pd10: {
    paddingTop: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  subText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    bottom: 15,
    padding: 10,
  },
});
export default Services;
