/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  MetadataDelegateRole,
  TokenStandard,
  TokenStandardArgs,
  findMetadataDelegateRecordPda,
  findMetadataPda,
  getTokenStandardSerializer,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  AccountMeta,
  Context,
  Pda,
  PublicKey,
  Serializer,
  Signer,
  TransactionBuilder,
  mapSerializer,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { findCandyMachineAuthorityPda } from '../../hooked';
import { addAccountMeta, addObjectProperty } from '../shared';

// Accounts.
export type SetTokenStandardInstructionAccounts = {
  candyMachine: PublicKey | Pda;
  authority?: Signer;
  authorityPda?: PublicKey | Pda;
  payer?: Signer;
  ruleSet?: PublicKey | Pda;
  collectionDelegateRecord?: PublicKey | Pda;
  collectionMint: PublicKey | Pda;
  collectionMetadata?: PublicKey | Pda;
  collectionAuthorityRecord?: PublicKey | Pda;
  collectionUpdateAuthority: Signer;
  tokenMetadataProgram?: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
  sysvarInstructions?: PublicKey | Pda;
  authorizationRulesProgram?: PublicKey | Pda;
  authorizationRules?: PublicKey | Pda;
};

// Data.
export type SetTokenStandardInstructionData = {
  discriminator: Array<number>;
  tokenStandard: TokenStandard;
};

export type SetTokenStandardInstructionDataArgs = {
  tokenStandard: TokenStandardArgs;
};

export function getSetTokenStandardInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  SetTokenStandardInstructionDataArgs,
  SetTokenStandardInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    SetTokenStandardInstructionDataArgs,
    any,
    SetTokenStandardInstructionData
  >(
    s.struct<SetTokenStandardInstructionData>(
      [
        ['discriminator', s.array(s.u8(), { size: 8 })],
        ['tokenStandard', getTokenStandardSerializer(context)],
      ],
      { description: 'SetTokenStandardInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [147, 212, 106, 195, 30, 170, 209, 128],
    })
  ) as Serializer<
    SetTokenStandardInstructionDataArgs,
    SetTokenStandardInstructionData
  >;
}

// Args.
export type SetTokenStandardInstructionArgs =
  SetTokenStandardInstructionDataArgs;

// Instruction.
export function setTokenStandard(
  context: Pick<
    Context,
    'serializer' | 'programs' | 'eddsa' | 'identity' | 'payer'
  >,
  input: SetTokenStandardInstructionAccounts & SetTokenStandardInstructionArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplCandyMachineCore',
    'CndyV3LdqHUfDLmE5naZjVN8rBZz4tqhdefbAnjHG3JR'
  );

  // Resolved inputs.
  const resolvedAccounts = {
    candyMachine: [input.candyMachine, true] as const,
    collectionMint: [input.collectionMint, false] as const,
    collectionUpdateAuthority: [
      input.collectionUpdateAuthority,
      false,
    ] as const,
  };
  const resolvingArgs = {};
  addObjectProperty(
    resolvedAccounts,
    'authority',
    input.authority
      ? ([input.authority, false] as const)
      : ([context.identity, false] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'authorityPda',
    input.authorityPda
      ? ([input.authorityPda, true] as const)
      : ([
          findCandyMachineAuthorityPda(context, {
            candyMachine: publicKey(input.candyMachine, false),
          }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'payer',
    input.payer
      ? ([input.payer, true] as const)
      : ([context.payer, true] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'ruleSet',
    input.ruleSet
      ? ([input.ruleSet, false] as const)
      : ([programId, false] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'collectionDelegateRecord',
    input.collectionDelegateRecord
      ? ([input.collectionDelegateRecord, true] as const)
      : ([
          findMetadataDelegateRecordPda(context, {
            mint: publicKey(input.collectionMint, false),
            delegateRole: MetadataDelegateRole.Collection,
            updateAuthority: publicKey(input.collectionUpdateAuthority, false),
            delegate: publicKey(resolvedAccounts.authorityPda[0], false),
          }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'collectionMetadata',
    input.collectionMetadata
      ? ([input.collectionMetadata, true] as const)
      : ([
          findMetadataPda(context, {
            mint: publicKey(input.collectionMint, false),
          }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'collectionAuthorityRecord',
    input.collectionAuthorityRecord
      ? ([input.collectionAuthorityRecord, true] as const)
      : ([programId, false] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'tokenMetadataProgram',
    input.tokenMetadataProgram
      ? ([input.tokenMetadataProgram, false] as const)
      : ([
          context.programs.getPublicKey(
            'mplTokenMetadata',
            'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
          ),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'systemProgram',
    input.systemProgram
      ? ([input.systemProgram, false] as const)
      : ([
          context.programs.getPublicKey(
            'splSystem',
            '11111111111111111111111111111111'
          ),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'sysvarInstructions',
    input.sysvarInstructions
      ? ([input.sysvarInstructions, false] as const)
      : ([
          publicKey('Sysvar1nstructions1111111111111111111111111'),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'authorizationRulesProgram',
    input.authorizationRulesProgram
      ? ([input.authorizationRulesProgram, false] as const)
      : ([programId, false] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'authorizationRules',
    input.authorizationRules
      ? ([input.authorizationRules, false] as const)
      : ([programId, false] as const)
  );
  const resolvedArgs = { ...input, ...resolvingArgs };

  addAccountMeta(keys, signers, resolvedAccounts.candyMachine, false);
  addAccountMeta(keys, signers, resolvedAccounts.authority, false);
  addAccountMeta(keys, signers, resolvedAccounts.authorityPda, false);
  addAccountMeta(keys, signers, resolvedAccounts.payer, false);
  addAccountMeta(keys, signers, resolvedAccounts.ruleSet, false);
  addAccountMeta(
    keys,
    signers,
    resolvedAccounts.collectionDelegateRecord,
    false
  );
  addAccountMeta(keys, signers, resolvedAccounts.collectionMint, false);
  addAccountMeta(keys, signers, resolvedAccounts.collectionMetadata, false);
  addAccountMeta(
    keys,
    signers,
    resolvedAccounts.collectionAuthorityRecord,
    false
  );
  addAccountMeta(
    keys,
    signers,
    resolvedAccounts.collectionUpdateAuthority,
    false
  );
  addAccountMeta(keys, signers, resolvedAccounts.tokenMetadataProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.systemProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.sysvarInstructions, false);
  addAccountMeta(
    keys,
    signers,
    resolvedAccounts.authorizationRulesProgram,
    false
  );
  addAccountMeta(keys, signers, resolvedAccounts.authorizationRules, false);

  // Data.
  const data =
    getSetTokenStandardInstructionDataSerializer(context).serialize(
      resolvedArgs
    );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
