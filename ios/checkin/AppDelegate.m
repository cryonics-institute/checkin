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
@end

@implementation AppDelegate

@synthesize window = _window;

- (BOOL)application:
  (UIApplication *)application didFinishLaunchingWithOptions:
    (NSDictionary *)launchOptions
{
  self.moduleRegistryAdapter = [
    [UMModuleRegistryAdapter alloc] initWithModuleRegistryProvider:
      [[UMModuleRegistryProvider alloc] init]
  ];
  RCTBridge *bridge = [
    [RCTBridge alloc] initWithDelegate: self launchOptions: launchOptions
  ];
  RCTRootView *rootView = [
    [RCTRootView alloc] initWithBridge:
      bridge moduleName: @"checkin" initialProperties: nil
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
    UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert |
        UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
    [[UNUserNotificationCenter currentNotificationCenter]
        requestAuthorizationWithOptions: authOptions
        completionHandler: ^(BOOL granted, NSError * _Nullable error) {
          // ...
        }];
  } else {
    // iOS 10 notifications aren't available; fall back to iOS 8-9
    // notifications.
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

- (NSArray<id<RCTBridgeModule>> *)extraModulesForBridge: (RCTBridge *)bridge
{
  NSArray<id<RCTBridgeModule>> *extraModules = [
    _moduleRegistryAdapter extraModulesForBridge: bridge
  ];
  // You can inject any extra modules that you would like here, more information
  // at:
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
