use anchor_lang::prelude::*;

declare_id!("ESiQM6PKr1xeCEm8CGTkPBaqhegED9irwgNMG9jQxthZ");

#[program]
pub mod voto_electronico {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, bump: u8) -> ProgramResult {
        ctx.accounts.vote_account.bump = bump;
        Ok(())
    }

    pub fn vote_for_tim_berners(ctx: Context<Vote>) -> ProgramResult {
        ctx.accounts.vote_account.tim_berners += 1;
        Ok(())
    }

    pub fn vote_for_alan_turing(ctx: Context<Vote>) -> ProgramResult {
        ctx.accounts.vote_account.alan_turing += 1;
        Ok(())
    }

    pub fn vote_for_donald_knuth(ctx: Context<Vote>) -> ProgramResult {
        ctx.accounts.vote_account.donald_knuth += 1;
        Ok(())
    }

    pub fn vote_for_barbara_liskov(ctx: Context<Vote>) -> ProgramResult {
        ctx.accounts.vote_account.barbara_liskov += 1;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct Initialize<'info> {
    #[account(init, seeds = [b"vote_account".as_ref()], bump = bump, payer = user)]
    vote_account: Account<'info, VotingState>,
    user: Signer<'info>,
    system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut, seeds = [b"vote_account".as_ref()], bump = vote_account.bump)]
    vote_account: Account<'info, VotingState>,
}

#[account]
#[derive(Default)]
pub struct VotingState {
    tim_berners: u32,
    alan_turing: u32,
    donald_knuth: u32,
    barbara_liskov: u32,
    bump: u8,
}

