interface AppErrorArgs {
    message: string;
    statusCode: number;
}

export class AppError extends Error {

    public readonly statusCode: number;

    constructor(args: AppErrorArgs) {
        super(args.message);

        this.name = "AppError";
        this.statusCode = args.statusCode;
    }

}