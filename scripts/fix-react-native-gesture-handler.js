#!/usr/bin/env node
/**
 * Post-install script to fix ViewManagerWithGeneratedInterface issues with react-native-gesture-handler
 * This package has codegen files that reference New Architecture interfaces even when disabled
 *
 * RN 0.77 used getPointerEvents()-only ReactPointerEventsView; RN 0.80+ uses val pointerEvents again.
 */
const fs = require('fs');
const path = require('path');

function isRnAtLeast080() {
  const rnPkg = path.join(__dirname, '..', 'node_modules', 'react-native', 'package.json');
  if (!fs.existsSync(rnPkg)) return false;
  const { version } = JSON.parse(fs.readFileSync(rnPkg, 'utf8'));
  const [maj, min] = version.split('.').map(Number);
  return maj > 0 || (maj === 0 && min >= 80);
}

const packagePath = path.join(
  __dirname,
  '..',
  'node_modules',
  'react-native-gesture-handler',
  'android',
  'paper',
  'src',
  'main',
  'java',
  'com',
  'facebook',
  'react',
  'viewmanagers'
);

const interfaceFiles = [
  'RNGestureHandlerButtonManagerInterface.java',
  'RNGestureHandlerRootViewManagerInterface.java'
];

interfaceFiles.forEach(fileName => {
  const filePath = path.join(packagePath, fileName);
  if (fs.existsSync(filePath)) {
    try {
      let fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Remove the import for ViewManagerWithGeneratedInterface
      fileContent = fileContent.replace(
        /import com\.facebook\.react\.uimanager\.ViewManagerWithGeneratedInterface;\n/g,
        ''
      );
      
      // Remove "extends ViewManagerWithGeneratedInterface" from interface declaration
      fileContent = fileContent.replace(
        /extends ViewManagerWithGeneratedInterface/g,
        ''
      );
      
      fs.writeFileSync(filePath, fileContent, 'utf8');
      console.log(`✅ Fixed ${fileName}`);
    } catch (error) {
      console.warn(`⚠️  Failed to patch ${fileName}:`, error.message);
    }
  }
});

// RN 0.77+: ReactPointerEventsView only exposes getPointerEvents(); the old Kotlin property override no longer compiles.
const buttonViewManagerKt = path.join(
  __dirname,
  '..',
  'node_modules',
  'react-native-gesture-handler',
  'android',
  'src',
  'main',
  'java',
  'com',
  'swmansion',
  'gesturehandler',
  'react',
  'RNGestureHandlerButtonViewManager.kt'
);

if (fs.existsSync(buttonViewManagerKt)) {
  try {
    let kt = fs.readFileSync(buttonViewManagerKt, 'utf8');
    if (isRnAtLeast080()) {
      if (kt.includes('pointerEventsValue')) {
        kt = kt.replace(
          `    view.pointerEventsValue = when (pointerEvents) {`,
          `    view.pointerEvents = when (pointerEvents) {`
        );
        kt = kt.replace(
          `    internal var pointerEventsValue: PointerEvents = PointerEvents.AUTO

    override fun getPointerEvents(): PointerEvents = pointerEventsValue

`,
          `    override var pointerEvents: PointerEvents = PointerEvents.AUTO

`
        );
        fs.writeFileSync(buttonViewManagerKt, kt, 'utf8');
        console.log('✅ Restored RNGestureHandlerButtonViewManager.kt for RN 0.80+ (pointerEvents property)');
      } else {
        console.log('ℹ️  RNGestureHandlerButtonViewManager.kt already matches RN 0.80+ pointer events API');
      }
    } else if (kt.includes('override fun getPointerEvents(): PointerEvents')) {
      console.log('ℹ️  RNGestureHandlerButtonViewManager.kt already patched for RN 0.77');
    } else {
      kt = kt.replace(
        `  override fun setPointerEvents(view: ButtonViewGroup, pointerEvents: String?) {
    view.pointerEvents = when (pointerEvents) {`,
        `  override fun setPointerEvents(view: ButtonViewGroup, pointerEvents: String?) {
    view.pointerEventsValue = when (pointerEvents) {`
      );
      kt = kt.replace(
        `    override var pointerEvents: PointerEvents = PointerEvents.AUTO`,
        `    internal var pointerEventsValue: PointerEvents = PointerEvents.AUTO

    override fun getPointerEvents(): PointerEvents = pointerEventsValue`
      );
      fs.writeFileSync(buttonViewManagerKt, kt, 'utf8');
      console.log('✅ Fixed RNGestureHandlerButtonViewManager.kt (ReactPointerEventsView / getPointerEvents)');
    }
  } catch (error) {
    console.warn('⚠️  Failed to patch RNGestureHandlerButtonViewManager.kt:', error.message);
  }
}
