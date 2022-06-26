# Petunjuk dan Dokumentasi

> Projek   : Camer (Catat Meter Air dan Listrik)
> Bagian   : Front-End
> Platform  : Android
> Framework : React Native

## Kloning

1. Gandakan repository ini pada komputer anda
2. Ikuti tutorial pemasangan React Native pada [laman](https://reactnative.dev/docs/environment-setup)
3. Pastikan anda memiliki `nodejs` pada komputer anda, jika belum anda dapat mendownload nya pada [laman](https://nodejs.org/) ini
4. Masuk ke project yang telah anda kloning, lalu pada terminal ketikkan `npm i -g yarn`
5. Setelah Yarn terinstall, install dependensi project dengan memasukkan perintah pada terminal `yarn install`
6. Buka file `build.gradle` pada folder [node_modules/react-native-month-year-picker/android/build.gradle](node_modules/react-native-month-year-picker/android/build.gradle), dan replace semua kodenya dengan kode dibawah ini

  ```gradle
  // android/build.gradle

  // based on:
  //
  // * https://github.com/facebook/react-native/blob/0.60-stable/template/android/build.gradle
  //   original location:
  //   - https://github.com/facebook/react-native/blob/0.58-stable/local-cli/templates/HelloWorld/android/build.gradle
  //
  // * https://github.com/facebook/react-native/blob/0.60-stable/template/android/app/build.gradle
  //   original location:
  //   - https://github.com/facebook/react-native/blob/0.58-stable/local-cli/templates/HelloWorld/android/app/build.gradle

  def DEFAULT_COMPILE_SDK_VERSION = 29
  def DEFAULT_BUILD_TOOLS_VERSION = '29.0.3'
  def DEFAULT_MIN_SDK_VERSION = 21
  def DEFAULT_TARGET_SDK_VERSION = 29
  def DEFAULT_NDK_VERSION = '20.1.5948944'

  def safeExtGet(prop, fallback) {
      rootProject.ext.has(prop) ? rootProject.ext.get(prop) : fallback
  }

  apply plugin: 'com.android.library'

  buildscript {
      // The Android Gradle plugin is only required when opening the android folder stand-alone.
      // This avoids unnecessary downloads and potential conflicts when the library is included as a
      // module dependency in an application project.
      // ref: https://docs.gradle.org/current/userguide/tutorial_using_tasks.html#sec:build_script_external_dependencies
      if (project == rootProject) {
          repositories {
              google()
              jcenter()
          }
          dependencies {
              classpath 'com.android.tools.build:gradle:4.1.0'
          }
      }
  }

  apply plugin: 'com.android.library'

  android {
      compileSdkVersion safeExtGet('compileSdkVersion', DEFAULT_COMPILE_SDK_VERSION)
      buildToolsVersion safeExtGet('buildToolsVersion', DEFAULT_BUILD_TOOLS_VERSION)
      defaultConfig {
          ndkVersion safeExtGet('ndkVersion', DEFAULT_NDK_VERSION)
          minSdkVersion safeExtGet('minSdkVersion', DEFAULT_MIN_SDK_VERSION)
          targetSdkVersion safeExtGet('targetSdkVersion', DEFAULT_TARGET_SDK_VERSION)
          versionCode 1
          versionName "1.0"
      }
      lintOptions {
          abortOnError false
      }
  }

  repositories {
      // ref: https://www.baeldung.com/maven-local-repository
      mavenLocal()
      maven {
          // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
          url "$rootDir/../node_modules/react-native/android"
      }
      maven {
          // Android JSC is installed from npm
          url "$rootDir/../node_modules/jsc-android/dist"
      }
      google()
      jcenter()
  }

  dependencies {
      //noinspection GradleDynamicVersion
      implementation 'com.facebook.react:react-native:+'  // From node_modules
  }

  def configureReactNativePom(def pom) {
      def packageJson = new groovy.json.JsonSlurper().parseText(file('../package.json').text)

      pom.project {
          name packageJson.title
          artifactId packageJson.name
          version = packageJson.version
          group = "com.gusparis.monthpicker"
          description packageJson.description
          url packageJson.repository.baseUrl

          licenses {
              license {
                  name packageJson.license
                  url packageJson.repository.baseUrl + '/blob/master/' + packageJson.licenseFilename
                  distribution 'repo'
              }
          }

          developers {
              developer {
                  id packageJson.author.username
                  name packageJson.author.name
              }
          }
      }
  }

  afterEvaluate { project ->
      // some Gradle build hooks ref:
      // https://www.oreilly.com/library/view/gradle-beyond-the/9781449373801/ch03.html
      task androidJavadoc(type: Javadoc) {
          source = android.sourceSets.main.java.srcDirs
          classpath += files(android.bootClasspath)
          include '**/*.java'
      }

      task androidJavadocJar(type: Jar, dependsOn: androidJavadoc) {
          classifier = 'javadoc'
          from androidJavadoc.destinationDir
      }

      task androidSourcesJar(type: Jar) {
          classifier = 'sources'
          from android.sourceSets.main.java.srcDirs
          include '**/*.java'
      }

      android.libraryVariants.all { variant ->
          def name = variant.name.capitalize()
          def javaCompileTask = variant.javaCompileProvider.get()

          task "jar${name}"(type: Jar, dependsOn: javaCompileTask) {
              from javaCompileTask.destinationDir
          }
      }

      artifacts {
          archives androidSourcesJar
          archives androidJavadocJar
      }

      task installArchives(type: Upload) {
          configuration = configurations.archives
      }
  }
```

7. Ketikkan `yarn android` pada terminal project ini. Jika setup environment anda benar maka akan terbuka jendela bash baru untuk debugging.

## Exporting APK

1. Arahkan terminal pada folder `android` dengan `cd android`
2. Masukkan perintah `./gradlew assembleRelease`
3. Setelah proses selesai, anda akan dapatkan file apk pada [android/app/build/generated/../outputs/apk/debug/app-debug.apk](android/app/build/generated/../outputs/apk/debug/app-debug.apk)
4. Pasang file apk tersebut pada perangkat android anda