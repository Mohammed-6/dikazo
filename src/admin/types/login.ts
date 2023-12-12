export interface loginProps {
    loginUsername: string;
    loginPassword: string;
    clinicId?: string;
  }
  
  export type BranchStructure = {
    branchName: string;
    __v: number;
    _id: string;
  }
  
  export const branchProps: BranchStructure[] = [];