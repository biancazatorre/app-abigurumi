import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: '50'
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250,
    height: '100%',
    backgroundColor: '#CDB7E1',
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1000, 
  },

  headerMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

  menuItemContainer: {
    marginBottom: 10,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ADEEE8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },

  menuText: {
    fontSize: 16,
    color: '#000',
  },

  separator: {
    height: 1,
    backgroundColor: '#ADEEE8',
    marginVertical: 5,
  },

  footer: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14
  },

  footerText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
});
