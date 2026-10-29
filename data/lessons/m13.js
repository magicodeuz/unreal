// Modul 13 — C++ asoslari (Kun 73–78)
window.UE_LESSONS.push(
{
  d: 73, t: "C++ ga kirish: muhitni sozlash va birinchi klass", time: "3 soat",
  g: "Unreal C++ uchun ish muhitini sozlash, Blueprint loyihaga C++ qo'shish va birinchi klassni kompilyatsiya qilish.",
  learn: ["Nima uchun C++", "Visual Studio 2022 / Rider sozlash", "Blueprint loyihaga C++ qo'shish", "Source papkasi tuzilishi: .h va .cpp", "Live Coding", "Unreal C++ ning o'ziga xosliklari"],
  body: [
    { h: "Qachon C++ kerak?",
      table: [["Vazifa", "Blueprint", "C++"],
              ["Gameplay prototip, UI mantiq, kontent", "✔ Tez va qulay", "Ortiqcha"],
              ["Og'ir hisob-kitob (minglab obyektlar, algoritmlar)", "Sekin", "✔ 10–100× tez"],
              ["Dvigatel imkoniyatlariga to'liq kirish", "Cheklangan", "✔"],
              ["Dedicated server, GAS, maxsus Movement", "Qisman yoki imkonsiz", "✔"],
              ["Katta jamoa, versiya nazorati (merge)", "Binary fayllar — merge qiyin", "✔ Matn"]],
      p2: "Professional amaliyot: **asosiy tizimlar va base klasslar — C++ da**, ularning sozlanishi, kontent va tez o'zgaradigan mantiq esa — Blueprint child'larda. Siz Blueprint'ni bilasiz, shuning uchun C++ ga o'tish ancha oson bo'ladi: tushunchalar bir xil." },
    { h: "Muhitni sozlash",
      steps: ["**Visual Studio 2022 Community** (bepul) o'rnating. Installer'da: {{Game development with C++}} workload, ichida **Unreal Engine installer** va **IDE support for Unreal Engine** ✔; shuningdek kerakli Windows SDK va .NET.",
              "Muqobil: **JetBrains Rider** (Unreal uchun juda qulay, talabalar uchun bepul litsenziya bor).",
              "Unreal: {{Edit → Editor Preferences → Source Code → Source Code Editor}} = Visual Studio 2022 yoki Rider.",
              "Visual Studio'da **Unreal Engine Integration** (VS 2022 17.x) — Blueprint havolalari va UPROPERTY qiymatlarini kod ichida ko'rsatadi."],
      warn: "UE versiyasi talab qiladigan MSVC toolchain va Windows SDK versiyalarini rasmiy «Setting Up Visual Studio» sahifasidan tekshiring. Noto'g'ri toolchain — kompilyatsiya xatolarining eng keng tarqalgan sababi." },
    { h: "Birinchi C++ klass",
      steps: ["Editor'da {{Tools → New C++ Class}} → Parent: **Actor** → nomi `RotatingActor` → {{Create Class}}.",
              "Unreal loyihaga `Source/` papkasini, `.sln` faylini qo'shadi va kompilyatsiya qiladi. Loyiha endi C++ loyiha (Blueprint'lar saqlanib qoladi).",
              "Visual Studio'da `RotatingActor.h` va `RotatingActor.cpp` ochiladi."],
      bp: `Source/
└── UE90_Sandbox/
    ├── UE90_Sandbox.Build.cs      // modul bog'liqliklari (EnhancedInput, AIModule, UMG ...)
    ├── UE90_Sandbox.h / .cpp      // modul
    ├── RotatingActor.h            // e'lon (declaration): klass, o'zgaruvchilar, funksiyalar
    └── RotatingActor.cpp          // amalga oshirish (definition)` },
    { h: "Kod",
      code: `// RotatingActor.h
#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "RotatingActor.generated.h"   // har doim oxirgi include

UCLASS()
class UE90_SANDBOX_API ARotatingActor : public AActor
{
	GENERATED_BODY()

public:
	ARotatingActor();
	virtual void Tick(float DeltaSeconds) override;

protected:
	UPROPERTY(VisibleAnywhere)
	TObjectPtr<UStaticMeshComponent> Mesh;

	UPROPERTY(EditAnywhere, Category = "Rotation")
	float DegreesPerSecond = 90.f;
};

// RotatingActor.cpp
#include "RotatingActor.h"
#include "Components/StaticMeshComponent.h"

ARotatingActor::ARotatingActor()
{
	PrimaryActorTick.bCanEverTick = true;
	Mesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Mesh"));
	RootComponent = Mesh;
}

void ARotatingActor::Tick(float DeltaSeconds)
{
	Super::Tick(DeltaSeconds);
	AddActorLocalRotation(FRotator(0.f, DegreesPerSecond * DeltaSeconds, 0.f));
}`,
      tip: "Bu Kun 7 dagi Blueprint'ning aynan o'zi: Tick → AddActorLocalRotation(Delta × 90). C++ da ham xuddi shu funksiyalar, faqat matn ko'rinishida." },
    { h: "Kompilyatsiya va Live Coding",
      ul: ["Editor ochiq bo'lsa: **Live Coding** — {{Ctrl+Alt+F11}} yoki Editor pastidagi {{Compile}} tugmasi. `.cpp` dagi o'zgarishlar Editor'ni yopmasdan qo'llanadi.",
           "Header (.h) da o'zgaruvchi/funksiya qo'shish yoki olib tashlash (UPROPERTY/UFUNCTION) — Live Coding bilan ko'pincha ishlaydi, lekin ishonchsiz. Xavfsiz yo'l: Editor'ni yoping, Visual Studio'da {{Build}} (Development Editor, Win64) va Editor'ni VS'dan ishga tushiring ({{F5}} — debugger bilan).",
           "Kompilyatsiya xatolari: Visual Studio'ning **Output** oynasiga qarang (Error List ba'zan noto'g'ri xatolarni ko'rsatadi)."] },
    { h: "Unreal C++ o'ziga xosliklari",
      table: [["Tushuncha", "Ma'nosi"],
              ["Prefikslar: A, U, F, E, I, T", "A — Actor, U — UObject, F — struct/oddiy klass, E — enum, I — interface, T — shablon (TArray)"],
              ["UCLASS / UPROPERTY / UFUNCTION", "Reflection makrolari — Editor, Blueprint va Garbage Collector ularni «ko'radi»"],
              ["GENERATED_BODY()", "Unreal Header Tool yaratadigan kod"],
              [".generated.h", "Avtomatik fayl — eng oxirgi include"],
              ["TArray, TMap, TSet, FString, FName, FText", "Unreal konteynerlari va matn turlari (std:: emas)"],
              ["TObjectPtr<T>", "UE5 da UPROPERTY pointer'lar uchun"],
              ["Super::", "Parent funksiyasini chaqirish (Blueprint'dagi Parent: node)"]] },
    { h: "Amaliy topshiriq",
      steps: ["Visual Studio yoki Rider'ni sozlang va `UE90_Sandbox` ga C++ qo'shing.",
              "`ARotatingActor` ni yozib kompilyatsiya qiling, levelga qo'ying.",
              "Undan Blueprint child (`BP_RotatingCoin`) yarating, mesh va DegreesPerSecond'ni Blueprint'da sozlang.",
              "Live Coding bilan aylanish o'qini Yaw'dan Roll'ga o'zgartiring.",
              "`BobAmplitude` o'zgaruvchisi qo'shib, Kun 7 challenge'dagi suzishni C++ da yozing (FMath::Sin, GetWorld()->GetTimeSeconds())."] }
  ],
  check: ["IDE sozlangan va loyiha kompilyatsiya bo'ladi", "C++ Actor yaratdim", ".h va .cpp vazifasini bilaman", "Live Coding'ni ishlataman", "Unreal prefikslarini bilaman", "C++ klassdan Blueprint child yaratdim"],
  err: [["«Could not be compiled. Try rebuilding from source manually»", "Editor'ni yoping, `.uproject` ga o'ng tugma → {{Generate Visual Studio project files}}, VS'da Build qiling va xatoni Output oynasida o'qing."],
        ["Header'ga UPROPERTY qo'shgandan keyin Blueprint'da ko'rinmaydi", "Live Coding header o'zgarishini qo'llamagan. Editor'ni yopib, to'liq Build qiling."]],
  ch: "C++ da `AOscillatingPlatform` yozing: `EndOffset` (FVector, `meta=(MakeEditWidget=true)` — levelda gizmo bilan) va `Duration` bilan ikki nuqta orasida silliq ping-pong (FMath::Sin yoki InterpEaseInOut).",
  quiz: [["Actor klasslar prefiksi:", ["U", "A", "F", "T"], 1, "A — Actor."],
         ["Editor yopmasdan .cpp o'zgarishlarini qo'llash:", ["Hot Reload", "Live Coding", "Rebuild", "Package"], 1, "Ctrl+Alt+F11."],
         ["Parent funksiyasini chaqirish:", ["Parent::", "Super::", "Base::", "this->"], 1, "Super::Tick(...)."]]
},
{
  d: 74, t: "UPROPERTY, UFUNCTION va Blueprint bilan aloqa", time: "3 soat",
  g: "C++ o'zgaruvchi va funksiyalarini Editor va Blueprint'ga ochish: specifier'lar, meta ma'lumotlar va kategoriyalar.",
  learn: ["UPROPERTY specifier'lari", "EditAnywhere vs VisibleAnywhere", "BlueprintReadWrite / ReadOnly", "UFUNCTION(BlueprintCallable / Pure)", "Meta: ClampMin, ToolTip, EditCondition", "UENUM va USTRUCT"],
  body: [
    { h: "UPROPERTY specifier'lari",
      table: [["Specifier", "Blueprint'dagi analog"],
              ["EditAnywhere", "Instance Editable + default'da ham tahrirlanadi"],
              ["EditDefaultsOnly", "Faqat Class Defaults'da (nusxada emas)"],
              ["EditInstanceOnly", "Faqat levelga qo'yilgan nusxada"],
              ["VisibleAnywhere", "Ko'rinadi, lekin tahrirlanmaydi (component pointer'lar uchun)"],
              ["BlueprintReadWrite", "Blueprint'da Get va Set"],
              ["BlueprintReadOnly", "Faqat Get"],
              ["Category = \"Combat\"", "Details'dagi guruh"],
              ["Replicated / ReplicatedUsing=OnRep_X", "Replikatsiya (Kun 77)"],
              ["Transient", "Saqlanmaydi"],
              ["SaveGame", "SaveGame serializatsiyasi uchun belgi"]],
      code: `UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Health",
          meta = (ClampMin = "1.0", UIMin = "1.0", UIMax = "500.0"))
float MaxHealth = 100.f;

UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Health")
float CurrentHealth = 0.f;

UPROPERTY(EditAnywhere, Category = "Health")
bool bCanRegenerate = true;

UPROPERTY(EditAnywhere, Category = "Health", meta = (EditCondition = "bCanRegenerate"))
float RegenPerSecond = 5.f;   // faqat bCanRegenerate ✔ bo'lganda tahrirlanadi`,
      warn: "Component pointer'larga **EditAnywhere** emas, **VisibleAnywhere** bering. EditAnywhere pointer'ning o'zini almashtirishga ruxsat beradi va bu component'ni buzishi mumkin. Component'ning ichki sozlamalari VisibleAnywhere bilan ham tahrirlanadi." },
    { h: "UFUNCTION",
      table: [["Specifier", "Natija"],
              ["BlueprintCallable", "Blueprint'da exec pinli node"],
              ["BlueprintPure", "Exec pinsiz, qiymat qaytaruvchi node (const funksiyalar uchun)"],
              ["BlueprintImplementableEvent", "C++ da e'lon, Blueprint'da amalga oshiriladi (Kun 76)"],
              ["BlueprintNativeEvent", "C++ da standart amalga oshirish + Blueprint override (Kun 76)"],
              ["CallInEditor", "Details'da tugma bo'lib chiqadi — Editor vositalari uchun"],
              ["Server / Client / NetMulticast", "RPC (Kun 77)"],
              ["Exec", "Konsol buyrug'i (PlayerController, CheatManager'da)"]],
      code: `UFUNCTION(BlueprintCallable, Category = "Health")
void ApplyHeal(float Amount);

UFUNCTION(BlueprintPure, Category = "Health")
float GetHealthPercent() const { return MaxHealth > 0.f ? CurrentHealth / MaxHealth : 0.f; }

UFUNCTION(CallInEditor, Category = "Debug")
void RandomizeColor();` },
    { h: "UENUM va USTRUCT",
      code: `UENUM(BlueprintType)
enum class EItemType : uint8
{
	Weapon  UMETA(DisplayName = "Qurol"),
	Potion  UMETA(DisplayName = "Dori"),
	Key     UMETA(DisplayName = "Kalit")
};

USTRUCT(BlueprintType)
struct FInventorySlot
{
	GENERATED_BODY()

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	FName ItemID;

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	int32 Quantity = 0;
};

// Data Table qatori uchun: struct FItemRow : public FTableRowBase { ... };`,
      tip: "C++ da yaratilgan Enum va Struct'lar Blueprint'dagilardan ancha barqaror: maydon qo'shish Blueprint'larni buzmaydi. Katta loyihada asosiy struct'larni C++ da yozing." },
    { h: "Unreal turlari — tezkor ma'lumotnoma",
      table: [["Blueprint", "C++"],
              ["Boolean", "bool"],
              ["Integer / Integer64", "int32 / int64"],
              ["Float", "float (UE5 Blueprint'da aslida double)"],
              ["String / Name / Text", "FString / FName / FText"],
              ["Vector / Rotator / Transform", "FVector / FRotator / FTransform"],
              ["Array / Map / Set", "TArray<T> / TMap<K,V> / TSet<T>"],
              ["Object Reference", "TObjectPtr<T> (UPROPERTY'da) yoki T*"],
              ["Class Reference", "TSubclassOf<T>"],
              ["Soft Object / Class", "TSoftObjectPtr<T> / TSoftClassPtr<T>"]] },
    { h: "Amaliy topshiriq",
      steps: ["`ATreasureChest` (C++ Actor): Mesh (Visible), `bIsLocked`, `RequiredKey` (FName, EditCondition = bIsLocked), `GoldAmount` (ClampMin 0).",
              "`UFUNCTION(BlueprintCallable) bool TryOpen(FName KeyID)`, `UFUNCTION(BlueprintPure) bool IsOpen() const`.",
              "`UFUNCTION(CallInEditor) void RandomizeGold()` — Details'dagi tugma bilan oltin miqdori tasodifiy bo'lsin.",
              "`EItemType` va `FInventorySlot` ni C++ da e'lon qiling va Blueprint'da ishlating.",
              "Blueprint child'da TryOpen'ni chaqirib sinang."] }
  ],
  check: ["UPROPERTY specifier'larini bilaman", "VisibleAnywhere va EditAnywhere farqini bilaman", "BlueprintCallable va BlueprintPure funksiyalar yozdim", "meta: ClampMin, EditCondition'ni ishlatdim", "UENUM/USTRUCT yaratdim"],
  err: [["UPROPERTY Editor'da ko'rinmaydi", "Specifier yo'q (masalan faqat UPROPERTY()) yoki Live Coding header'ni qo'llamagan — to'liq Build qiling."],
        ["«Struct... must have GENERATED_BODY» xatosi", "USTRUCT ichida GENERATED_BODY() va fayl boshida .generated.h include bo'lishi kerak."]],
  ch: "`UFUNCTION(Exec)` konsol buyrug'i: PlayerController child'ida `GiveGold(int32 Amount)` — konsolda `GiveGold 500` yozilganda ishlasin.",
  quiz: [["Component pointer uchun to'g'ri specifier:", ["EditAnywhere", "VisibleAnywhere", "Transient", "Config"], 1, "Pointer o'zgartirilmasin."],
         ["Exec pinsiz Blueprint node:", ["BlueprintCallable", "BlueprintPure", "Exec", "CallInEditor"], 1, "Pure."],
         ["Class Reference'ning C++ ko'rinishi:", ["UClass", "TSubclassOf<T>", "TObjectPtr<T>", "FName"], 1, "TSubclassOf."]]
},
{
  d: 75, t: "C++ Actor, Component va Character", time: "3–4 soat",
  g: "C++ da component'lar bilan Actor yaratish, Actor Component yozish va C++ Character'da Enhanced Input'ni ulash.",
  learn: ["CreateDefaultSubobject va attach", "BeginPlay, Tick, EndPlay", "UActorComponent yaratish", "Overlap event'larni bog'lash (AddDynamic)", "C++ Character + Enhanced Input", "Build.cs modullari"],
  body: [
    { h: "Component'lar bilan Actor",
      code: `// PickupActor.h (asosiy qismlar)
UCLASS()
class UE90_SANDBOX_API APickupActor : public AActor
{
	GENERATED_BODY()
public:
	APickupActor();
protected:
	virtual void BeginPlay() override;

	UPROPERTY(VisibleAnywhere) TObjectPtr<class USphereComponent> Sphere;
	UPROPERTY(VisibleAnywhere) TObjectPtr<UStaticMeshComponent> Mesh;
	UPROPERTY(EditAnywhere, Category = "Pickup") FName ItemID;
	UPROPERTY(EditAnywhere, Category = "Pickup") int32 Quantity = 1;

	UFUNCTION()   // AddDynamic uchun UFUNCTION majburiy!
	void OnSphereOverlap(UPrimitiveComponent* OverlappedComp, AActor* OtherActor,
		UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult& SweepResult);
};

// PickupActor.cpp
APickupActor::APickupActor()
{
	Sphere = CreateDefaultSubobject<USphereComponent>(TEXT("Sphere"));
	Sphere->InitSphereRadius(60.f);
	Sphere->SetCollisionProfileName(TEXT("OverlapAllDynamic"));
	RootComponent = Sphere;

	Mesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Mesh"));
	Mesh->SetupAttachment(Sphere);
	Mesh->SetCollisionEnabled(ECollisionEnabled::NoCollision);
}

void APickupActor::BeginPlay()
{
	Super::BeginPlay();
	Sphere->OnComponentBeginOverlap.AddDynamic(this, &APickupActor::OnSphereOverlap);
}

void APickupActor::OnSphereOverlap(UPrimitiveComponent*, AActor* OtherActor,
	UPrimitiveComponent*, int32, bool, const FHitResult&)
{
	if (APawn* Pawn = Cast<APawn>(OtherActor); Pawn && Pawn->IsPlayerControlled())
	{
		UE_LOG(LogTemp, Log, TEXT("Picked up %s x%d"), *ItemID.ToString(), Quantity);
		Destroy();
	}
}`,
      tip: "`UE_LOG(LogTemp, Warning, TEXT(\"...\"))` — C++ dagi Print String (Output Log'ga). Ekranga: `GEngine->AddOnScreenDebugMessage(-1, 3.f, FColor::Green, TEXT(\"...\"))`." },
    { h: "Actor Component",
      code: `// HealthComponent.h
UCLASS(ClassGroup = (Custom), meta = (BlueprintSpawnableComponent))
class UE90_SANDBOX_API UHealthComponent : public UActorComponent
{
	GENERATED_BODY()
public:
	UHealthComponent();

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Health") float MaxHealth = 100.f;
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Health") float Health = 0.f;

protected:
	virtual void BeginPlay() override;

	UFUNCTION()
	void HandleTakeAnyDamage(AActor* DamagedActor, float Damage, const UDamageType* DamageType,
		AController* InstigatedBy, AActor* DamageCauser);
};

// HealthComponent.cpp
void UHealthComponent::BeginPlay()
{
	Super::BeginPlay();
	Health = MaxHealth;
	if (AActor* Owner = GetOwner())
	{
		Owner->OnTakeAnyDamage.AddDynamic(this, &UHealthComponent::HandleTakeAnyDamage);
	}
}

void UHealthComponent::HandleTakeAnyDamage(AActor*, float Damage, const UDamageType*, AController*, AActor*)
{
	if (Damage <= 0.f || Health <= 0.f) return;
	Health = FMath::Clamp(Health - Damage, 0.f, MaxHealth);
	// Dispatcher'lar — Kun 77
}`,
      p2: "`meta = (BlueprintSpawnableComponent)` — component Blueprint'dagi {{+ Add}} ro'yxatida paydo bo'ladi. Bu Kun 27 dagi BPC_Health'ning C++ versiyasi." },
    { h: "C++ Character va Enhanced Input",
      code: `// Build.cs: PublicDependencyModuleNames.AddRange(new string[] { "Core", "CoreUObject", "Engine", "InputCore", "EnhancedInput" });

// HeroCharacter.h
UPROPERTY(EditDefaultsOnly, Category = "Input") TObjectPtr<class UInputMappingContext> DefaultIMC;
UPROPERTY(EditDefaultsOnly, Category = "Input") TObjectPtr<class UInputAction> IA_Move;
UPROPERTY(EditDefaultsOnly, Category = "Input") TObjectPtr<class UInputAction> IA_Jump;
virtual void SetupPlayerInputComponent(UInputComponent* PlayerInputComponent) override;
virtual void NotifyControllerChanged() override;
void Move(const struct FInputActionValue& Value);

// HeroCharacter.cpp
#include "EnhancedInputComponent.h"
#include "EnhancedInputSubsystems.h"
#include "InputActionValue.h"

void AHeroCharacter::NotifyControllerChanged()
{
	Super::NotifyControllerChanged();
	if (APlayerController* PC = Cast<APlayerController>(Controller))
		if (auto* Subsystem = ULocalPlayer::GetSubsystem<UEnhancedInputLocalPlayerSubsystem>(PC->GetLocalPlayer()))
			Subsystem->AddMappingContext(DefaultIMC, 0);
}

void AHeroCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);
	if (auto* EIC = Cast<UEnhancedInputComponent>(PlayerInputComponent))
	{
		EIC->BindAction(IA_Move, ETriggerEvent::Triggered, this, &AHeroCharacter::Move);
		EIC->BindAction(IA_Jump, ETriggerEvent::Started, this, &ACharacter::Jump);
		EIC->BindAction(IA_Jump, ETriggerEvent::Completed, this, &ACharacter::StopJumping);
	}
}

void AHeroCharacter::Move(const FInputActionValue& Value)
{
	const FVector2D Axis = Value.Get<FVector2D>();
	const FRotator YawRot(0.f, Controller->GetControlRotation().Yaw, 0.f);
	AddMovementInput(FRotationMatrix(YawRot).GetUnitAxis(EAxis::X), Axis.Y);
	AddMovementInput(FRotationMatrix(YawRot).GetUnitAxis(EAxis::Y), Axis.X);
}`,
      tip: "Third Person C++ shablonidan yangi loyiha yaratib, `<Loyiha>Character.cpp` ni o'qing — bu yerdagi kodning to'liq, rasmiy namunasi." },
    { h: "Amaliy topshiriq",
      steps: ["`APickupActor` va `UHealthComponent` ni yozing va Blueprint'larda sinang.",
              "`AHeroCharacter` (C++): SpringArm + Camera component'lari, Move, Look, Jump. IA va IMC'lar Blueprint child (`BP_HeroCpp`) da tanlanadi.",
              "Build.cs ga `EnhancedInput` modulini qo'shing.",
              "`UHealthComponent` ni BP_HeroCpp va dummy'ga qo'shing, Apply Damage bilan sinang.",
              "Output Log'da UE_LOG xabarlarini kuzating (Category filtri: LogTemp)."] }
  ],
  check: ["CreateDefaultSubobject va SetupAttachment'ni bilaman", "AddDynamic bilan event bog'layman (UFUNCTION bilan)", "UActorComponent yozdim", "C++ Character'da Enhanced Input ishlaydi", "Build.cs'ga modul qo'sha olaman"],
  err: [["Linker xatosi: unresolved external symbol ... EnhancedInput", "Build.cs'ga `EnhancedInput` moduli qo'shilmagan."],
        ["AddDynamic kompilyatsiya qilinmaydi", "Callback funksiyasi UFUNCTION() emas yoki parametrlar delegat imzosiga aynan mos emas."],
        ["Konstruktordagi o'zgarish Blueprint child'da ko'rinmaydi", "Blueprint child konstruktor default'larini allaqachon saqlab qo'ygan bo'lishi mumkin. Blueprint'dagi qiymatni {{Reset to Default}} (↩) qiling."]],
  ch: "`UInteractorComponent` (C++): Timer bilan trace, FocusedActor, `OnFocusChanged` — Kun 25 dagi tizimni C++ ga ko'chiring va unumdorlikni `stat game` bilan solishtiring.",
  quiz: [["Konstruktorda component yaratish funksiyasi:", ["NewObject", "CreateDefaultSubobject", "SpawnActor", "AddComponent"], 1, "CreateDefaultSubobject<T>."],
         ["AddDynamic callback'i qanday bo'lishi shart?", ["static", "UFUNCTION()", "inline", "virtual"], 1, "Dinamik delegatlar reflection talab qiladi."],
         ["Enhanced Input uchun Build.cs moduli:", ["InputCore", "EnhancedInput", "UMG", "AIModule"], 1, "EnhancedInput."]]
},
{
  d: 76, t: "C++ va Blueprint birgalikda: arxitektura", time: "3 soat",
  g: "C++ base klasslar + Blueprint child'lar modelini o'zlashtirish: Implementable/Native event'lar va Blueprint'ga mos API dizayni.",
  learn: ["BlueprintImplementableEvent", "BlueprintNativeEvent va _Implementation", "C++ interface (UINTERFACE)", "Blueprint Function Library C++ da", "Abstract va Blueprintable", "Qaysi mantiq qayerda"],
  body: [
    { h: "BlueprintImplementableEvent",
      p: "C++ da e'lon qilinadi, lekin **amalga oshirilmaydi** — Blueprint child'da event bo'lib chiqadi. C++ uni xohlagan payt chaqiradi. Vizual va kosmetik reaksiyalar uchun ideal.",
      code: `// .h
UFUNCTION(BlueprintImplementableEvent, Category = "Pickup")
void OnPickedUp(APawn* ByPawn);   // .cpp da yozilmaydi!

// .cpp — C++ mantiq tugagach Blueprint'ga signal
OnPickedUp(Pawn);   // Blueprint'da: effekt, ovoz, animatsiya
Destroy();` },
    { h: "BlueprintNativeEvent",
      p: "C++ da **standart** amalga oshirish bor, Blueprint esa uni override qilishi (va Parent chaqirishi) mumkin.",
      code: `// .h
UFUNCTION(BlueprintNativeEvent, BlueprintCallable, Category = "Interact")
void Interact(AActor* Interactor);
virtual void Interact_Implementation(AActor* Interactor);

// .cpp
void ADoorBase::Interact_Implementation(AActor* Interactor)
{
	bIsOpen = !bIsOpen;
	OnDoorStateChanged(bIsOpen);   // BlueprintImplementableEvent — animatsiya Blueprint'da (Timeline)
}`,
      tip: "Chaqirishda `Interact(...)` ishlatiladi (`_Implementation` emas!) — shunda Blueprint override bo'lsa, u chaqiriladi." },
    { h: "C++ Interface",
      code: `// Interactable.h
UINTERFACE(MinimalAPI, Blueprintable)
class UInteractable : public UInterface { GENERATED_BODY() };

class UE90_SANDBOX_API IInteractable
{
	GENERATED_BODY()
public:
	UFUNCTION(BlueprintNativeEvent, BlueprintCallable, Category = "Interact")
	void Interact(AActor* Interactor);

	UFUNCTION(BlueprintNativeEvent, BlueprintCallable, Category = "Interact")
	FText GetInteractText() const;
};

// Chaqirish (C++ dan, Blueprint'da amalga oshirilgan bo'lsa ham ishlaydi)
if (Target && Target->Implements<UInteractable>())
{
	IInteractable::Execute_Interact(Target, this);
}`,
      warn: "Blueprint ham amalga oshirishi mumkin bo'lgan interface'ni chaqirishda doim `IInteractable::Execute_Interact(Target, ...)` ishlating. `Cast<IInteractable>(Target)->Interact()` faqat C++ da amalga oshirilgan klasslarda ishlaydi." },
    { h: "C++ Function Library",
      code: `UCLASS()
class UE90_SANDBOX_API UGameFunctionLibrary : public UBlueprintFunctionLibrary
{
	GENERATED_BODY()
public:
	UFUNCTION(BlueprintPure, Category = "UE90|Math")
	static FText FormatTime(float Seconds);

	UFUNCTION(BlueprintPure, Category = "UE90|Math")
	static bool IsInFrontOf(const AActor* Viewer, const AActor* Target, float Threshold = 0.5f);
};

bool UGameFunctionLibrary::IsInFrontOf(const AActor* Viewer, const AActor* Target, float Threshold)
{
	if (!Viewer || !Target) return false;
	const FVector Dir = (Target->GetActorLocation() - Viewer->GetActorLocation()).GetSafeNormal();
	return FVector::DotProduct(Viewer->GetActorForwardVector(), Dir) >= Threshold;
}` },
    { h: "Mantiqni taqsimlash",
      table: [["C++ da", "Blueprint'da"],
              ["Base klasslar va tizimlar (Health, Inventory, Interaction)", "Child klasslar va kontent (aniq qurol, aniq dushman)"],
              ["Og'ir hisob-kitoblar, loop'lar", "Vizual reaksiyalar: Timeline, effekt, ovoz"],
              ["Replikatsiya va xavfsizlik mantiqi", "Sozlash: mesh, material, raqamlar (yoki Data Asset)"],
              ["Ma'lumot tuzilmalari (USTRUCT, UENUM)", "UI va animatsiya mantiqi"],
              ["Event'larni e'lon qilish", "Event'larga javob"]],
      tip: "UCLASS(Abstract, Blueprintable) — C++ base'ni levelga qo'yib bo'lmaydi, faqat Blueprint child'lari orqali. Bu dizaynerlar uchun xavfsiz va tushunarli." },
    { h: "Amaliy topshiriq",
      steps: ["C++ `IInteractable` interface va `AInteractableBase` (Abstract) yarating: Interact — NativeEvent, OnInteracted — ImplementableEvent.",
              "`ADoorBase` (C++): holat va mantiq; Blueprint child'da Timeline animatsiyasi `OnDoorStateChanged` orqali.",
              "Kun 75 dagi InteractorComponent C++ interface orqali Interact chaqirsin — Kun 15 dagi Blueprint interface'li obyektlar ham ishlashi uchun BP interface'ni C++ interface bilan almashtiring.",
              "`UGameFunctionLibrary` — FormatTime, IsInFrontOf; Blueprint'da ishlating.",
              "Qaysi Blueprint mantiqini C++ ga ko'chirish foydali ekanini ro'yxat qiling."] }
  ],
  check: ["ImplementableEvent va NativeEvent farqini bilaman", "_Implementation qoidasini bilaman", "C++ interface yaratib, Execute_ bilan chaqiraman", "C++ Function Library yozdim", "Mantiqni C++ va BP orasida to'g'ri taqsimlayman"],
  err: [["NativeEvent'da «function already has a body» xatosi", "Funksiya tanasini `Interact` emas, `Interact_Implementation` nomi bilan yozing."],
        ["Blueprint'dagi interface amalga oshirilishi C++ chaqiruvida ishlamaydi", "Cast<IInterface> ishlatilgan. `Execute_FunctionName` ga o'ting."]],
  ch: "`AWeaponBase` (C++, Abstract): Fire mantiqi, ammo, Timer C++ da; `PlayFireEffects` — ImplementableEvent; `CanFire` — NativeEvent (Blueprint child qo'shimcha shart qo'sha oladi, masalan «suv ostida otmaydi»).",
  quiz: [["C++ da tanasi yo'q, Blueprint'da amalga oshiriladigan event:", ["BlueprintNativeEvent", "BlueprintImplementableEvent", "BlueprintCallable", "Exec"], 1, "Implementable."],
         ["NativeEvent'ning C++ tanasi qaysi nomda?", ["Func", "Func_Implementation", "Func_Native", "Func_Validate"], 1, "_Implementation."],
         ["Blueprint'da amalga oshirilgan interface'ni C++ dan chaqirish:", ["Cast<IX>()->Func()", "IX::Execute_Func(Target, ...)", "Target->Func()", "CallFunctionByName"], 1, "Execute_."]]
},
{
  d: 77, t: "Delegatlar, xotira (GC), Timer va replikatsiya C++ da", time: "3–4 soat",
  g: "Professional C++ uchun zarur mavzular: Event Dispatcher'ning C++ ko'rinishi, Garbage Collection, Timer'lar va tarmoq kodi.",
  learn: ["DECLARE_DYNAMIC_MULTICAST_DELEGATE", "BlueprintAssignable", "Garbage Collector va UPROPERTY", "TWeakObjectPtr", "FTimerHandle va SetTimer", "Replicated, OnRep, Server/Multicast RPC"],
  body: [
    { h: "Delegatlar — C++ dagi Dispatcher",
      code: `// HealthComponent.h — klassdan oldin
DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FOnHealthChanged, float, NewHealth, float, Delta);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnDeath, AController*, Killer);

// klass ichida
UPROPERTY(BlueprintAssignable, Category = "Health")
FOnHealthChanged OnHealthChanged;

UPROPERTY(BlueprintAssignable, Category = "Health")
FOnDeath OnDeath;

// .cpp — e'lon qilish (Call)
OnHealthChanged.Broadcast(Health, -Damage);
if (Health <= 0.f) OnDeath.Broadcast(InstigatedBy);`,
      tip: "**BlueprintAssignable** — Blueprint'da Bind/Assign qilish mumkin (xuddi Kun 16 dagi kabi). Delegat turlari: Dynamic Multicast (Blueprint bilan), Multicast (faqat C++, tezroq), Single (bitta tinglovchi)." },
    { h: "Garbage Collection — xotira",
      p: ["Unreal'da UObject'larni o'zingiz `delete` qilmaysiz — **Garbage Collector** (GC) ularni kuzatadi. GC obyektni «tirik» deb hisoblashi uchun unga **UPROPERTY** orqali havola bo'lishi kerak.",
          "Oddiy pointer (UPROPERTY'siz) bilan saqlangan UObject GC tomonidan o'chirilishi va pointer «osilib» (dangling) qolishi mumkin — bu crash'ga olib keladi."],
      code: `// ✘ XAVFLI — GC bu obyektni bilmaydi
UMyData* Data;

// ✔ TO'G'RI — GC havolani ko'radi
UPROPERTY() TObjectPtr<UMyData> Data;

// ✔ Egalik qilmaydigan havola (obyekt o'chsa — avtomatik null)
TWeakObjectPtr<AActor> CachedTarget;
if (CachedTarget.IsValid()) { CachedTarget->GetActorLocation(); }

// ✔ Har doim tekshiring
if (IsValid(Enemy)) { ... }   // null va «o'chirilmoqda» holatini tekshiradi`,
      warn: "Actor'lar `Destroy()` bilan o'chiriladi, oddiy UObject'lar esa havola qolmaganda GC tomonidan. UObject'ni `new` bilan yaratmang — `NewObject<T>(Outer)` ishlating." },
    { h: "Timer'lar",
      code: `// .h
FTimerHandle RegenTimer;
void Regenerate();

// .cpp
GetWorld()->GetTimerManager().SetTimer(RegenTimer, this, &UHealthComponent::Regenerate, 0.5f, true);
// to'xtatish
GetWorld()->GetTimerManager().ClearTimer(RegenTimer);
// lambda bilan bir martalik
FTimerHandle Tmp;
GetWorld()->GetTimerManager().SetTimer(Tmp, [this]() { Respawn(); }, 3.f, false);` },
    { h: "Replikatsiya C++ da",
      code: `// .h
#include "Net/UnrealNetwork.h"   // .cpp da

UPROPERTY(ReplicatedUsing = OnRep_Health, BlueprintReadOnly, Category = "Health")
float Health;

UFUNCTION()
void OnRep_Health(float OldHealth);

virtual void GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const override;

UFUNCTION(Server, Reliable)
void Server_Interact(AActor* Target);

UFUNCTION(NetMulticast, Unreliable)
void Multicast_PlayHitFX(FVector Location);

// .cpp
UHealthComponent::UHealthComponent() { SetIsReplicatedByDefault(true); }

void UHealthComponent::GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& Out) const
{
	Super::GetLifetimeReplicatedProps(Out);
	DOREPLIFETIME(UHealthComponent, Health);
	// DOREPLIFETIME_CONDITION(UHealthComponent, Ammo, COND_OwnerOnly);
}

void UHealthComponent::OnRep_Health(float OldHealth)
{
	OnHealthChanged.Broadcast(Health, Health - OldHealth);
}

void AHeroCharacter::Server_Interact_Implementation(AActor* Target) { /* serverda */ }`,
      warn: "C++ da OnRep funksiyasi **serverda avtomatik chaqirilmaydi** (Blueprint'dan farqli). Serverda ham vizual natija kerak bo'lsa, qiymatni o'zgartirgandan keyin OnRep'ni serverda qo'lda chaqiring." },
    { h: "Amaliy topshiriq",
      steps: ["`UHealthComponent` ga OnHealthChanged va OnDeath delegatlarini qo'shing — Blueprint HUD (Kun 32) ularga Bind qilsin.",
              "Regeneratsiyani FTimerHandle bilan yozing.",
              "Health'ni ReplicatedUsing bilan replikatsiya qiling; Kun 70 dagi Blueprint health'ni C++ versiya bilan almashtiring.",
              "AHeroCharacter'ga Server_Interact RPC qo'shing.",
              "Kodingizni ko'rib chiqing: UPROPERTY'siz UObject pointer qolmasin."] }
  ],
  check: ["Dynamic Multicast delegate e'lon qilib, Broadcast qilaman", "BlueprintAssignable bilan BP'da bog'layman", "GC va UPROPERTY bog'liqligini tushunaman", "TWeakObjectPtr va IsValid'ni ishlataman", "FTimerHandle bilan Timer", "DOREPLIFETIME va RPC _Implementation'ni bilaman"],
  err: [["Tasodifiy crash: «Access violation reading location 0xFFFFFFFF...»", "UPROPERTY'siz UObject pointer GC tomonidan o'chirilgan. UPROPERTY() qo'shing yoki TWeakObjectPtr ishlating."],
        ["Replicated o'zgaruvchi mijozga kelmaydi", "GetLifetimeReplicatedProps'da DOREPLIFETIME yo'q yoki component/Actor replikatsiya qilinmaydi (SetIsReplicatedByDefault / bReplicates)."]],
  ch: "`UInventoryComponent` ni C++ da yozing: `TArray<FInventorySlot>` (ReplicatedUsing, COND_OwnerOnly), `AddItem/RemoveItem` (faqat serverda — HasAuthority tekshiruvi), `OnInventoryChanged` delegat.",
  quiz: [["Blueprint'da Bind qilinadigan delegat specifier'i:", ["BlueprintCallable", "BlueprintAssignable", "BlueprintReadOnly", "Replicated"], 1, "BlueprintAssignable."],
         ["UObject GC'dan himoyalanishi uchun:", ["static qilish", "UPROPERTY havolasi", "delete chaqirmaslik", "const"], 1, "GC faqat UPROPERTY'larni kuzatadi."],
         ["C++ da OnRep serverda:", ["Avtomatik chaqiriladi", "Avtomatik chaqirilmaydi", "Xato beradi", "Faqat Reliable'da"], 1, "Qo'lda chaqirish kerak."]]
},
{
  d: 78, t: "LOYIHA: C++ asosidagi gameplay framework", time: "5 soat",
  g: "C++ modulini yakunlash: Kun 66 dagi framework'ning asosiy tizimlarini C++ ga ko'chirish, Blueprint esa kontent va vizual uchun qoladi.",
  learn: ["C++ framework arxitekturasi", "Component'lar C++ da", "Data Asset C++ da", "Blueprint child'lar bilan sozlash", "Unumdorlikni solishtirish", "Kod sifati"],
  body: [
    { h: "Vazifa",
      table: [["C++ klass", "Vazifasi", "Blueprint tomoni"],
              ["UHealthComponent", "Zarar, o'lim, regen, replikatsiya, delegatlar", "HUD bog'lanishi"],
              ["UInventoryComponent", "Slotlar, Add/Remove, replikatsiya", "Inventar UI"],
              ["UInteractorComponent", "Trace, fokus, Server RPC", "Highlight effekti"],
              ["IInteractable + AInteractableBase", "Interaksiya kontrakti", "Eshik, sandiq, tugma child'lari"],
              ["UItemDataAsset (UPrimaryDataAsset)", "Buyum ma'lumotlari", "DA_ assetlar"],
              ["AHeroCharacterBase", "Input, harakat, component'lar", "BP_Hero: mesh, ABP, IA/IMC tanlash"],
              ["UGameFunctionLibrary", "Yordamchi funksiyalar", "Hamma joyda"]] },
    { h: "Data Asset C++ da",
      code: `UCLASS(BlueprintType)
class UE90_SANDBOX_API UItemDataAsset : public UPrimaryDataAsset
{
	GENERATED_BODY()
public:
	UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Item") FText DisplayName;
	UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Item", meta = (MultiLine = true)) FText Description;
	UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Item") TSoftObjectPtr<UTexture2D> Icon;
	UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Item") EItemType Type = EItemType::Potion;
	UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Item", meta = (ClampMin = 1)) int32 MaxStack = 1;
	UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Item") FGameplayTagContainer Tags;

	virtual FPrimaryAssetId GetPrimaryAssetId() const override
	{
		return FPrimaryAssetId(TEXT("Item"), GetFName());
	}
};`,
      tip: "`FGameplayTagContainer` uchun Build.cs'ga `GameplayTags` modulini qo'shing." },
    { h: "Ish tartibi",
      steps: ["Har tizimni alohida ko'chiring: avval C++ klass, keyin Blueprint'dagi eskisini almashtirish, keyin sinov. Bittada hammasini emas!",
              "Har bosqichdan keyin Git commit (Kun 85 dagi kabi) — orqaga qaytish imkoni bo'lsin.",
              "Blueprint'larda **Reparent**: eski BP_Hero'ni ochib {{Class Settings → Parent Class}} = AHeroCharacterBase. Ehtiyot bo'ling: bir xil nomli o'zgaruvchilar to'qnashadi — avval BP'dagini qayta nomlang.",
              "Unumdorlik: 200 ta interaktiv obyekt va 50 ta dushman bilan `stat game` va Unreal Insights'da (Kun 79) BP va C++ versiyalarini solishtiring.",
              "Kod sifati: har klass boshida izoh, `UE_LOG` uchun o'z kategoriyangiz (`DECLARE_LOG_CATEGORY_EXTERN(LogUE90, Log, All)`), `check`/`ensure` bilan himoya."] },
    { h: "Kod uslubi (Epic Coding Standard)",
      ul: ["Klass va funksiyalar — PascalCase: `ApplyDamage`, `UHealthComponent`.",
           "Bool'lar `b` bilan: `bIsDead`.",
           "Tablar bilan chekinish, `{` yangi qatorda.",
           "Header'larda minimal include, forward declaration (`class USphereComponent;`).",
           "`const` imkon qadar: `GetHealthPercent() const`.",
           "Magic number'lar o'rniga UPROPERTY yoki constexpr."] }
  ],
  check: ["Asosiy component'lar C++ da", "Interaction C++ interface orqali", "Buyumlar UItemDataAsset'da", "Blueprint'lar faqat sozlash va vizual uchun", "Unumdorlik solishtirildi", "Har bosqich alohida commit qilindi"],
  err: [["Reparent'dan keyin Blueprint'da o'zgaruvchilar takrorlanib qoldi", "C++ va BP'da bir xil nomli o'zgaruvchi bor. BP'dagisini o'chirib, havolalarni C++ variantiga ulang (o'ng tugma → Replace References)."],
        ["Editor ochilmayapti (C++ crash)", "Konstruktor yoki BeginPlay'da null pointer. Visual Studio'dan F5 (DebugGame Editor) bilan ishga tushiring — debugger aynan xato qatorida to'xtaydi."]],
  ch: "Kichik GAS tajribasi: Gameplay Ability System plaginini yoqing va Lyra yoki GAS Documentation (Tranek, GitHub) asosida bitta qobiliyat (Dash) yarating. GAS — yirik loyihalarning standarti; uni chuqur o'rganishni kursdan keyingi qadamlaringizga qo'shing.",
  quiz: [["Katta refaktoringning to'g'ri usuli:", ["Hammasini birdan", "Tizimma-tizim, har bosqichda sinov va commit", "Faqat oxirida sinash", "Yangi loyiha ochish"], 1, "Kichik qadamlar."],
         ["C++ crash'ni topishning eng tez usuli:", ["Print String", "Visual Studio debugger (F5)", "Qayta o'rnatish", "Output Log'ni o'chirish"], 1, "Debugger xato qatorida to'xtaydi."]]
}
);
