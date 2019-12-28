/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <UMCore/UMModuleRegistry.h>
#import <UMReactNativeAdapter/UMNativeModulesProxy.h>
#import <UMReactNativeAdapter/UMModuleRegistryAdapter.h>

@import UserNotifications;

// Implement UNUserNotificationCenterDelegate to receive display notification
// via APNS for devices running iOS 10 and above.
@interface AppDelegate () <UNUserNotificationCenterDelegate>
//@property (nonatomic, strong) RCTRootView *rootView;
@end

@implementation AppDelegate

@synthesize window = _window;

- (BOOL)application:
  (UIApplication *)application
    didFinishLaunchingWithOptions: (NSDictionary *)launchOptions
{
  self.moduleRegistryAdapter = [
    [UMModuleRegistryAdapter alloc]
      initWithModuleRegistryProvider: [[UMModuleRegistryProvider alloc] init]
  ];
  RCTBridge *bridge = [
    [RCTBridge alloc]
      initWithDelegate: self
      launchOptions: launchOptions
  ];
  RCTRootView *rootView = [
    [RCTRootView alloc]
      initWithBridge: bridge
      moduleName: @"checkin"
      initialProperties: nil
  ];
  rootView.backgroundColor = [
    [UIColor alloc] initWithRed: 1.0f green: 1.0f blue: 1.0f alpha: 1
  ];

  self.window = [[UIWindow alloc] initWithFrame: [UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  [super application: application didFinishLaunchingWithOptions: launchOptions];
  
  [FIRApp configure];
  [FIRMessaging messaging].delegate = self;
  
  if ([UNUserNotificationCenter class] != nil) {
    // iOS 10 or later
    // For iOS 10 display notification (sent via APNS)
    [UNUserNotificationCenter currentNotificationCenter].delegate = self;
    UNAuthorizationOptions authOptions =
      UNAuthorizationOptionAlert |
      UNAuthorizationOptionSound |
      UNAuthorizationOptionBadge;
    [
      [UNUserNotificationCenter currentNotificationCenter]
        requestAuthorizationWithOptions: authOptions
        completionHandler: ^(BOOL granted, NSError * _Nullable error) {
          // ...
        }
    ];
  } else {
    // iOS 10 notifications aren't available; use iOS 8-9 notifications instead.
    UIUserNotificationType allNotificationTypes = (
      UIUserNotificationTypeSound |
      UIUserNotificationTypeAlert |
      UIUserNotificationTypeBadge
    );
    UIUserNotificationSettings *settings = [
      UIUserNotificationSettings settingsForTypes:
        allNotificationTypes categories: nil
    ];
    [application registerUserNotificationSettings: settings];
  }

  [application registerForRemoteNotifications];

  return YES;
}

#pragma mark -- Custom Firebase Code

- (void)messaging: (FIRMessaging *)messaging
  didReceiveRegistrationToken: (NSString *)fcmToken
{
  NSLog(@"FCM registration token: %@", fcmToken);
  // Notify about received token.
  NSDictionary *dataDict = [
    NSDictionary dictionaryWithObject: fcmToken forKey: @"token"
  ];
  [
    [NSNotificationCenter defaultCenter]
      postNotificationName: @"FCMToken" object: nil userInfo: dataDict
  ];
  // TODO: If necessary send token to application server.
  // Note: This callback is fired at each app startup and whenever a new token
  // is generated.
  
  [
    [FIRInstanceID instanceID] instanceIDWithHandler: ^(
      FIRInstanceIDResult * _Nullable result,
      NSError * _Nullable error
    )
    {
      if (error != nil) {
        NSLog(@"Error fetching remote instance ID: %@", error);
      } else {
        NSLog(@"Remote instance ID token: %@", result.token);
//        NSString* message = [
//          NSString stringWithFormat: @"Remote InstanceID token: %@", result.token
//        ];
//        self.instanceIDTokenMessage.text = message;
        ((RCTRootView *) self.window.rootViewController.view).appProperties = @{
          @"FCMToken": result.token
          
        };
        NSLog(
          @"Root view application properties: %@", @{@"FCMToken": result.token}
        );
        NSLog(
          @"Root view application properties: %@", (
            (RCTRootView *) self.window.rootViewController.view
          ).appProperties
        );
      }
    }
  ];
}

#pragma mark -- Custom React Native Code

- (NSArray<id<RCTBridgeModule>> *)extraModulesForBridge: (RCTBridge *)bridge
{
  NSArray<id<RCTBridgeModule>> *extraModules = [
    _moduleRegistryAdapter extraModulesForBridge: bridge
  ];
  // You can inject any extra modules that you would like here.
  // More information at:
  // https://facebook.github.io/react-native/docs/native-modules-ios.html#dependency-injection
  return extraModules;
}

- (NSURL *)sourceURLForBridge: (RCTBridge *)bridge {
  #ifdef DEBUG
    return [
      [RCTBundleURLProvider sharedSettings]
        jsBundleURLForBundleRoot: @"index"
        fallbackResource: nil
    ];
  #else
    return [
      [NSBundle mainBundle] URLForResource: @"main" withExtension: @"jsbundle"
    ];
  #endif
}

@end
