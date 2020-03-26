// FCMModule.java

package com.michaelgill1969.checkin;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import androidx.annotation.NonNull;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;

public class FCMModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  FCMModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  @Override
  public String getName() {
    return "FCM";
  }

  @ReactMethod
  public void getToken(final Promise promise) {
    FirebaseInstanceId.getInstance().getInstanceId().addOnCompleteListener(
      new OnCompleteListener<InstanceIdResult>() {
        @Override
        public void onComplete(@NonNull Task<InstanceIdResult> task) {
          if (!task.isSuccessful()) {
            return;
          }

          // Get new Instance ID token
          String token = task.getResult().getToken();
          promise.resolve(
            token
          );
        }
      }
    );
    // TODO: Monitor Token Generation
    // https://firebase.google.com/docs/cloud-messaging/android/client#monitor-token-generation
  }
}
